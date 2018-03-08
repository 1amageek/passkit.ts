"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
const Process = require("child_process");
const index_1 = require("./index");
class Manifest {
    constructor() {
        this.data = {};
    }
    addFile(buffer, filename, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = Crypto.createHash('sha1');
            this.data[filename] = hash.update(buffer, encoding).digest('hex');
        });
    }
    toJSON() {
        return this.data;
    }
    sign(passTypeIdentifier, manifestBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.certtificates.loadIfNeeded();
            }
            catch (error) {
                throw error;
            }
            const args = [
                "smime",
                "-sign", "-binary",
                "-signer", index_1.certtificates.secret,
                "-certfile", index_1.certtificates.wwdr,
                "-passin", "pass:" + index_1.certtificates.options.password
            ];
            const promise = new Promise((resolve, reject) => {
                const smime = Process.execFile('openssl', args, { encoding: "utf8" }, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    if (stderr) {
                        reject(new Error(stderr));
                        return;
                    }
                    const signature = stdout.split(/\n\n/)[3];
                    resolve(new Buffer(signature, 'base64'));
                });
                smime.stdin.write(manifestBuffer);
                smime.stdin.end();
            });
            return promise;
        });
    }
}
exports.default = Manifest;
//# sourceMappingURL=manifest.js.map