import * as PassKit from '../src/index'

export const options: PassKit.Options = {
    secret: "./keys/key.pem",
    wwdr: "./keys/wwdr.pem",
    passTypeIdentifier: "pass.***",
    teamIdentifier: "***",
    password: "***"
}