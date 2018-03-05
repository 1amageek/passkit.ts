import * as Crypto from 'crypto-promise'
import * as Path from 'path'
import * as Process from 'child_process'
import * as Util from 'util'

export default class Manifest {

    data: { [key: string]: string } = {}

    keysPath: string

    constructor(keysPath: string) {
        this.keysPath = keysPath
    }

    async addFile(filename: string) {
        const hash = await Crypto.hash('md5')(filename)
        this.data[filename] = hash.toString('hex')
        console.log(this.data)
    }

    toJSON(): { [key: string]: string } {
        return this.data
    }

    async sign(passTypeIdentifier: string, manifestBuffer, password: string) {
        const identifier = passTypeIdentifier.replace(/^pass./, "");
        const args = [
            "smime",
            "-sign", "-binary",
            "-signer", Path.resolve(this.keysPath, `${identifier}.pem`),
            "-certfile", Path.resolve(this.keysPath, "wwdr.pem"),
            "-passin", "pass:" + password
        ]
        const promise = new Promise<Buffer>((resolve, reject) => {
            const smime = Process.execFile('openssl', args, (error, stdout, stderr) => { 
                if (error) {
                    reject(error)
                    return
                }
                if (stderr) {
                    reject(new Error(stderr))
                    return
                }
                const signature = stdout.split(/\n\n/)[3]
                resolve(new Buffer(signature, 'base64'))
            })
            smime.stdin.write(manifestBuffer)
            smime.stdin.end()
        })
        return promise
    }
}