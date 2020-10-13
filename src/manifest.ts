import * as Crypto from 'crypto'
import * as forge from 'node-forge'
import * as fs from 'fs'
import * as path from 'path'
import { certificates } from './index'

export default class Manifest {

    data: { [key: string]: string } = {}

    async addFile(buffer: Buffer, filename: string, encoding: Crypto.Utf8AsciiLatin1Encoding) {
        const hash: Crypto.Hash = Crypto.createHash('sha1')
        this.data[filename] = hash.update(buffer).digest('hex')
    }

    toJSON(): string {
        return JSON.stringify(this.data)
    }

    async sign() {

        const wwdrPath = certificates.wwdr
        const secretPath = certificates.secret

        if (!wwdrPath) {
            throw new Error('[Passkit] error: wwdr path not found')
        }

        if (!secretPath) {
            throw new Error('[Passkit] error: secret path not found')
        }

        const signerCertData: string = fs.readFileSync(path.resolve(process.cwd(), secretPath), { encoding: 'utf8' })
        const wwdrCertData: string = fs.readFileSync(path.resolve(process.cwd(), wwdrPath), { encoding: 'utf8' })
        const password: string = certificates.options.password
        const certificate: forge.pki.Certificate = forge.pki.certificateFromPem(signerCertData)
        const wwdr: forge.pki.Certificate = forge.pki.certificateFromPem(wwdrCertData)

        // getting signer private key
        const key = this._decodePrivateKey(signerCertData, password)

        // create PKCS#7 signed data
        const p7 = forge.pkcs7.createSignedData()
        p7.content = this.toJSON()
        p7.addCertificate(certificate)
        p7.addCertificate(wwdr)
        p7.addSigner({
            key,
            certificate,
            digestAlgorithm: forge.pki.oids.sha1,
            authenticatedAttributes: [
                {
                    type: forge.pki.oids.contentType,
                    value: forge.pki.oids.data,
                },
                {
                    type: forge.pki.oids.messageDigest,
                    // value will be auto-populated at signing time
                },
                {
                    type: forge.pki.oids.signingTime,
                    // value will be auto-populated at signing time
                    // value: new Date('2050-01-01T00:00:00Z')
                },
            ],
        })
        p7.sign()
        p7.contentInfo.value.pop()
        return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary')
    }

    private _decodePrivateKey(keydata: string, password: string) {
        const pemMessages = forge.pem.decode(keydata)

        // getting signer private key
        const signerKeyMessage = pemMessages.find(message =>
            message.type.includes('KEY'),
        )

        if (!signerKeyMessage) {
            throw new Error('[Passkit] error: Invalid certificate, no key found')
        }

        const key = forge.pki.decryptRsaPrivateKey(
            forge.pem.encode(signerKeyMessage),
            password,
        )

        if (!key) {
            if (
                (signerKeyMessage.procType && signerKeyMessage.procType.type === 'ENCRYPTED') ||
                signerKeyMessage.type.includes('ENCRYPTED')
            ) {
                throw new Error('[Passkit] error: Unable to parse key, incorrect passphrase')
            }
        }

        return forge.pki.privateKeyToPem(key)
    }
}