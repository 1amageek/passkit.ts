import { RGB, Beacon, Location, BarcodeFormat, NFC, BasicInformation } from './index'

/// Template
export default class Template {

    // Standard Keys
    description: string

    formatVersion: number = 1

    organizationName: string

    passTypeIdentifier: string

    serialNumber: string

    teamIdentifier: string

    // Associated App Keys
    appLaunchURL?: string

    associatedStoreIdentifiers?: number[]

    // Companion App Keys
    userInfo?: { [key: string] : Object }

    // Expiration Keys
    expirationDate?: Date

    voided?: boolean

    // Relevance Keys
    beacons?: Beacon[]

    locations?: Location[]

    maxDistance?: number

    relevantDate?: Date

    // Style Keys
    boardingPass?: {}

    coupon?: {}

    eventTicket?: {}

    generic?: {}

    storeCard?: {}

    // Visual Appearance Keys
    barcode?: BarcodeFormat

    barcodes?: BarcodeFormat[]

    backgroundColor?: RGB

    foregroundColor?: RGB

    groupingIdentifier?: string

    labelColor?: RGB

    logoText?: string

    // Web Service Keys
    authenticationToken?: string

    webServiceURL?: string

    nfc?: NFC

    /// constructro
    constructor(basic: BasicInformation, description: string, serialNumber: string) {
        this.passTypeIdentifier = basic.passTypeIdentifier
        this.teamIdentifier = basic.teamIdentifier
        this.organizationName = basic.organizationName
        this.description = description
        this.serialNumber = serialNumber
    }
}