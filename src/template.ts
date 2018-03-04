import { Pass, RGB, Beacon, Location, BarcodeFormat, NFC, BasicInformation } from './index'
import { PassType } from './pass'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as Crypto from 'crypto'
import * as mkdirp from 'mkdirp-promise'
import * as Archiver from 'archiver-promise'


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
    constructor(basic: BasicInformation, pass: Pass, description: string, serialNumber: string) {
        this.passTypeIdentifier = basic.passTypeIdentifier
        this.teamIdentifier = basic.teamIdentifier
        this.organizationName = basic.organizationName
        this.description = description
        this.serialNumber = serialNumber
    }

    toPass(): { [key: string]: any } {
        var pass: { [key: string]: any } = {}
        for (const key in this) {
            pass[key] = this[key]
        }
        return pass    
    }
}