import { Pass, RGB, Beacon, Location, Barcode, NFC, BasicInformation } from './index'


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
    userInfo?: { [key: string]: Object }

    // Expiration Keys
    expirationDate?: Date

    voided?: boolean

    // Relevance Keys
    beacons?: Beacon[]

    locations?: Location[]

    maxDistance?: number

    relevantDate?: Date

    // Style Keys
    boardingPass?: Pass

    coupon?: Pass

    eventTicket?: Pass

    generic?: Pass

    storeCard?: Pass

    // Visual Appearance Keys
    barcode?: Barcode

    barcodes?: Barcode[]

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
    constructor(basic: BasicInformation, pass: Pass, description: string, serialNumber: string) {
        this.passTypeIdentifier = basic.passTypeIdentifier
        this.teamIdentifier = basic.teamIdentifier
        this.organizationName = basic.organizationName
        this.description = description
        this.serialNumber = serialNumber
    }

    toPass(): { [key: string]: any } {
        const pass: { [key: string]: any } = {}
        for (const key in this) {  
            const value = this[key]
            if (value instanceof RGB) {
                pass[key] = (value as RGB).getValue()
            } else {
                pass[key] = value
            }    
        }
        return pass    
    }
}