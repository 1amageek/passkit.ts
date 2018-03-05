import * as path from 'path'
import * as fs from 'fs'
import * as https from 'https'
import * as mkdirp from 'mkdirp-promise'
import * as Archiver from 'archiver-promise'
import EventTicket from './eventTicket'
import Assets from './assets'
import Template from './template'
import Manifest from './manifest'

export { Assets, EventTicket }

export class BasicInformation {
    passTypeIdentifier: string
    teamIdentifier: string
    organizationName: string

    constructor(passTypeIdentifier: string, teamIdentifier: string, organizationName: string) {
        this.passTypeIdentifier = passTypeIdentifier
        this.teamIdentifier = teamIdentifier
        this.organizationName = organizationName
    }
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
    attributedValue: any
    changeMessage: string
    dataDetectorTypes: DataDetectorTypes[]
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

    getValue(): string {
        return `rgb(${this.r},${this.g},${this.b}}`
    }
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

const tmpDir: string = `${process.cwd()}/temp`
// const tempDir: string = os.tmpdir()

const loadImage = async (url, destination) => {
    const writeStream = fs.createWriteStream(destination)
    return new Promise<Buffer>((resolve, reject) => {
        https.get(url, (res) => {
            res.pipe(writeStream)
        })
        .on('close', () => {
            const data: Buffer = fs.readFileSync(destination)
            resolve(data)
        })
    })
}

export const generate = async (template: Template, assets: Assets, password: string) => {

    const manifest: Manifest = new Manifest('./keys')
    const filePath: string = `/passkit/${template.serialNumber}`
    const tempLocalFile = path.join(tmpDir, `${filePath}/pass.zip`)
    const tempLocalDir = path.dirname(tempLocalFile)
    await mkdirp(tempLocalDir)

    const archive = Archiver(tempLocalFile, { store: true })
    const buffer: Buffer = new Buffer(JSON.stringify(template.toPass()), 'utf-8')

    // Add pass.json
    const passName: string = 'pass.json'
    await manifest.addFile(buffer, passName)
    archive.append(buffer, { name: passName })

    // Add images
    for (const key in assets) {
        const filename: string = `${key.replace('2x', '@2x')}.png`
        const url: string = assets[key]
        const destination: string = path.join(tempLocalDir, filename)
        try {
            const data = await loadImage(url, destination)            
            await manifest.addFile(data, filename)
            archive.append(data, { name: filename })
            fs.unlinkSync(destination)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // Add manifest
    const manifestBuffer = new Buffer(JSON.stringify(manifest.toJSON()), 'utf-8')
    archive.append(manifestBuffer, { name: 'manifest.json' })

    // Add signature
    const signature = await manifest.sign(template.passTypeIdentifier, manifestBuffer, password)
    archive.append(signature, { name: "signature" })
    return await archive.finalize()
}