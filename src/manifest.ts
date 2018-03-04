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
    }

    async sign(identifier: string, password: string) {
        var args = [
            "smime",
            "-sign", "-binary",
            "-signer", Path.resolve(this.keysPath, identifier + ".pem"),
            "-certfile", Path.resolve(this.keysPath, "wwdr.pem"),
            "-passin", "pass:" + password
        ]
        const execFile = Util.promisify(Process.execFile)
        const { stdout, stderr } = await execFile("openssl", args)
        const stdout_replace = stdout.split(/\n\n/)[3]
        const signature = new Buffer(stdout_replace, "base64")
        return signature
    }
}