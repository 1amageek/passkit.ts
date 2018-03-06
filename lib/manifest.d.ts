/// <reference types="node" />
export default class Manifest {
    data: {
        [key: string]: string;
    };
    addFile(buffer: Buffer, filename: string): Promise<void>;
    toJSON(): {
        [key: string]: string;
    };
    sign(passTypeIdentifier: string, manifestBuffer: any, password: string): Promise<Buffer>;
}
