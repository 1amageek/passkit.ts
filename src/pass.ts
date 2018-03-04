import { Pass, RGB, Beacon, Location, BarcodeFormat, NFC, BasicInformation } from './index'

export type PassType = {

        // Standard Keys
        description: string

        formatVersion: number
    
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
        expirationDate?: string
    
        voided?: boolean
    
        // Relevance Keys
        beacons?: Beacon[]
    
        locations?: Location[]
    
        maxDistance?: number
    
        relevantDate?: string
    
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
}