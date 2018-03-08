/// <reference types="node" />
import * as Crypto from 'crypto';
export default class Manifest {
    data: {
        [key: string]: string;
    };
    addFile(buffer: Buffer, filename: string, encoding: Crypto.Utf8AsciiLatin1Encoding): Promise<void>;
    toJSON(): {
        [key: string]: string;
    };
    sign(passTypeIdentifier: string, manifestBuffer: any): Promise<Buffer>;
}
