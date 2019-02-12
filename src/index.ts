import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import * as https from 'https'
import * as mkdirp from 'mkdirp'
import * as request from 'request'
import * as Archiver from 'archiver'
import Assets from './assets'
import Template from './template'
import Manifest from './manifest'
import BoardingPass from './boardingPass'
import Coupon from './coupon'
import EventTicket from './eventTicket'
import Generic from './generic'
import StoreCard from './storeCard'
import { Stream } from 'stream'

export { Assets, BoardingPass, Coupon, EventTicket, Generic, StoreCard }

const tmpDir: string = process.env.NODE_ENV === 'production' ? `${os.tmpdir()}/passkit` : `${process.cwd()}/temp`

export enum Style {
    boardingPass = "boardingPass",
    coupon = "coupon",
    eventTicket = "eventTicket",
    generic = "generic",
    storeCard = "storeCard"
}

export interface CertificateLodingDelegate {
    /// Load secret 
    /// return destination url
    loadSecret(identifier: string): Promise<string>

    /// Load wwdr 
    /// return destination url
    loadWWDR(): Promise<string>
}

export type Options = {
    /// Specify the path where secret is placed.
    secret?: string

    /// Specify the path where wwdr is placed.
    wwdr?: string

    /// If the specified path does not exist, the secret file is read from the specified URL.
    secretURL?: string

    /// If the specified path does not exist, the wwdr file is read from the specified URL.
    wwdrURL?: string

    /// By specifying a delegate, you can customize the way the file is read.
    delegate?: CertificateLodingDelegate

    passTypeIdentifier: string
    teamIdentifier: string
    password: string
}

export class Certificates {

    secret?: string

    wwdr?: string

    options: Options

    constructor(options: Options) {
        this.options = options
        this.secret = options.secret
        this.wwdr = options.wwdr
    }

    async mountCertificate(url: string, destination: string) {
        const writeStream = fs.createWriteStream(destination)
        return new Promise<string>((resolve, reject) => {
            https.get(url, (res) => {
                res.pipe(writeStream)
            })
                .on('close', () => {
                    resolve(destination)
                })
        })
    }

    async mountIfNeeded() {

        const secretDir: string = `${tmpDir}/keys`

        if (!this.options.passTypeIdentifier) {
            console.error("[Passkit] error: passTypeIdentifier is required.")
            return
        }

        /// load secret
        if (!this.isExistFile(this.secret)) {
            const identifier: string = this.options.passTypeIdentifier.replace(/^pass./, "")
            if (this.options.delegate) {
                try {
                    this.secret = await this.options.delegate.loadSecret(identifier)
                } catch (error) {
                    throw error
                }
            } else {
                const destination = path.resolve(secretDir, `${identifier}.pem`)
                const tempLocalDir = path.dirname(destination)
                await mkdirp.sync(tempLocalDir)
                try {
                    this.secret = await this.mountCertificate(this.options.secretURL, destination)
                } catch (error) {
                    throw error
                }
            }
        }

        /// load wwdr
        if (!this.isExistFile(this.wwdr)) {
            if (this.options.delegate) {
                try {
                    this.wwdr = await this.options.delegate.loadWWDR()
                } catch (error) {
                    throw error
                }
            } else {
                const destination = path.resolve(secretDir, `wwdr.pem`)
                try {
                    this.wwdr = await this.mountCertificate(this.options.wwdrURL, destination)
                } catch (error) {
                    throw error
                }
            }
        }
    }

    isExistFile(file: string): boolean {
        try {
            fs.statSync(file)
            return true
        } catch (err) {
            return false
        }
    }
}

/// Certificates
export let certificates: Certificates

/// PassKit initialize
export const initialize = (options?: Options) => {
    certificates = new Certificates(options)
}

/// TransitType
export enum TransitType {
    Air = "PKTransitTypeAir",
    Boat = "PKTransitTypeBoat",
    Bus = "PKTransitTypeBus",
    Generic = "PKTransitTypeGeneric",
    Train = "PKTransitTypeTrain"
}

/// Standard Field Dictionary
export type Field = {
    attributedValue?: any
    changeMessage?: string
    dataDetectorTypes?: DataDetectorTypes[]
    key: string
    label?: string
    textAlignment?: TextAlignment
    value: any
}

/// Date Field Keys
export type DateField = {
    dateStyle: DateStyle
    ignoresTimeZone: boolean
    isRelative: boolean
    timeStyle: DateStyle
}

/// Date Style 
export enum DateStyle {
    None = "PKDateStyleNone",
    Short = "PKDateStyleShort",
    Medium = "PKDateStyleMedium",
    Long = "PKDateStyleLong",
    Full = "PKDateStyleFull"
}

/// Number Field Keys
export type NumberField = {
    currencyCode: string,
    numberStyle: NumberStyle
}

/// Number Style
export enum NumberStyle {
    Decimal = "PKNumberStyleDecimal",
    Percent = "PKNumberStylePercent",
    Scientific = "PKNumberStyleScientific",
    SpellOut = "PKNumberStyleSpellOut"
}

/// Pass Structure Dictionary Keys
export type Pass = {
    headerFields?: Field[]
    primaryFields?: Field[]
    secondaryFields?: Field[]
    auxiliaryFields?: Field[]
    backFields?: Field[]
    transitType?: TransitType
}

/// Beacon Dictionary Keys
export type Beacon = {
    major: string
    minor: string
    proximityUUID: string
    /// Text displayed on the lock screen when the pass is currently relevant. For example, a description of the nearby location such as “Store nearby on 1st and Main.”
    relevantText: string
}

/// Location Dictionary Keys
export type Location = {
    altitude?: number
    latitude: number
    longitude: number
    /// Text displayed on the lock screen when the pass is currently relevant. For example, a description of the nearby location such as “Store nearby on 1st and Main.”
    relevantText?: string
}

/// Barcode format
export enum BarcodeFormat {
    QR = "PKBarcodeFormatQR",
    PDF417 = "PKBarcodeFormatPDF417",
    Aztec = "PKBarcodeFormatAztec",
    Code128 = "PKBarcodeFormatCode128"
}

/// Barcode Dictionary Keys
export type Barcode = {
    /// Text displayed near the barcode. For example, a human-readable version of the barcode data in case the barcode doesn’t scan.
    altText?: string
    /// Barcode format. For the barcode dictionary, you can use only the following values: PKBarcodeFormatQR, PKBarcodeFormatPDF417, or PKBarcodeFormatAztec. For dictionaries in the barcodes array, you may also use PKBarcodeFormatCode128.
    format: string
    /// Message or payload to be displayed as a barcode.
    message: string
    /// Text encoding that is used to convert the message from the string representation to a data representation to render the barcode. The value is typically iso-8859-1, but you may use another encoding that is supported by your barcode scanning infrastructure.
    messageEncoding: string
}

/// NFC Dictionary Keys
export type NFC = {
    /// The payload to be transmitted to the Apple Pay terminal. Must be 64 bytes or less. Messages longer than 64 bytes are truncated by the system.
    message: string
    /// The public encryption key used by the Value Added Services protocol. Use a Base64 encoded X.509 SubjectPublicKeyInfo structure containing a ECDH public key for group P256.
    encryptionPublicKey?: string
}

/// RGB class
export class RGB {
    r: number = 255
    g: number = 255
    b: number = 255

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }

    getValue(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }
}

/// Barcode format
export enum PersonalizationField {
    Name = "PKPassPersonalizationFieldName",
    PostalCode = "PKPassPersonalizationFieldPostalCode",
    Address = "PKPassPersonalizationFieldEmailAddress",
    PhoneNumber = "PKPassPersonalizationFieldPhoneNumber"
}

/// Personalization
export type Personalization = {

    /// Required. The contents of this array define the data requested from the user. The signup form’s fields are generated based on these keys.
    requiredPersonalizationFields: PersonalizationField[]

    /// Required. A brief description of the program. This is displayed on the signup sheet, under the personalization logo.
    description: string

    /// Optional. A description of the program’s terms and conditions. This string can contain HTML link tags to external content.
    /// If present, this information is displayed after the user enters their personal information and taps the Next button. The user then has the option to agree to the terms, or to cancel out of the signup process.
    termsAndConditions?: string
}

/// DataDetectorTypes
export enum DataDetectorTypes {
    PhoneNumber = "PKDataDetectorTypePhoneNumber",
    Link = "PKDataDetectorTypeLink",
    Address = "PKDataDetectorTypeAddress",
    CalendarEvent = "PKDataDetectorTypeCalendarEvent"
}

/// TextAlignment
export enum TextAlignment {
    Left = "PKTextAlignmentLeft",
    Center = "PKTextAlignmentCenter",
    Right = "PKTextAlignmentRight",
    Natural = "PKTextAlignmentNatural"
}

const streamToBuffer = async (stream: Stream) => {
    return new Promise<Buffer>((resolve, reject) => {
        const buffers = []
        stream.on('error', reject)
        stream.on('data', (data) => buffers.push(data))
        stream.on('end', () => {
            resolve(Buffer.concat(buffers))
        })
    })
}

const loadImage = async (url: string) => {
    return new Promise<Buffer>((resolve, reject) => {
        request.get(url, { encoding: null }, async (error, res, body) => {
            if (error) {
                reject(error)
            } else {
                if (res.statusCode === 200) {
                    resolve(body)
                } else {
                    reject(new Error(`[Passkit] error: ${url} not found.`))
                }
            }
        })
    })
}

const imageArchive = async (archive: Archiver.Archiver, manifest: Manifest, filename: string, url: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await loadImage(url)
            archive.append(data, { name: filename })
            manifest.addFile(data, filename, "utf8")
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const cleanup = async (targetPath: string) => {
    const files = fs.readdirSync(targetPath)
    for (const file in files) {
        fs.unlinkSync(path.resolve(targetPath, files[file]))
    }
    fs.rmdirSync(targetPath)
}

export const generate = async (template: Template, assets: Assets, personalization?: Personalization) => {

    assets.validate()

    const manifest: Manifest = new Manifest()
    const filePath: string = `/pass/${template.serialNumber}`
    const tempLocalFile = path.join(tmpDir, `${filePath}/pass.pkpass`)
    const tempLocalDir = path.dirname(tempLocalFile)
    await mkdirp.sync(tempLocalDir)
    const passWriteStream = fs.createWriteStream(tempLocalFile)
    const archive = Archiver.create('zip', { store: true })
    archive.pipe(passWriteStream)

    // Add personalization.json
    if (personalization) {
        const personalizationName: string = 'personalization.json'
        const personalizationBuffer: Buffer = Buffer.from(JSON.stringify(personalization), 'utf-8')
        await manifest.addFile(personalizationBuffer, personalizationName, "utf8")
        archive.append(personalizationBuffer, { name: personalizationName })
    }

    // Add pass.json
    const passName: string = 'pass.json'
    const buffer: Buffer = Buffer.from(JSON.stringify(template.toPass()), 'utf-8')
    await manifest.addFile(buffer, passName, "utf8")
    archive.append(buffer, { name: passName })

    // Add images
    const tasks = []
    for (const key in assets) {
        const filename: string = `${key.replace('2x', '@2x')}.png`
        const url: string = assets[key]
        const task = imageArchive(archive, manifest, filename, url)
        tasks.push(task)
    }

    try {
        await Promise.all(tasks)
    } catch (error) {
        archive.abort()
        cleanup(tempLocalDir)
        throw error
    }

    // Add manifest
    const manifestJSON = manifest.toJSON()
    archive.append(manifestJSON, { name: 'manifest.json' })

    // Add signature
    try {
        const signature = await manifest.sign()
        archive.append(signature, { name: "signature" })
        archive.finalize()
        return tempLocalFile
    } catch (error) {
        archive.abort()
        throw error
    }
}