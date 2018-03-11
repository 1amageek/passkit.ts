import * as PassKit from './index';
export default class Template {
    description: string;
    formatVersion: number;
    organizationName: string;
    passTypeIdentifier: string;
    serialNumber: string;
    teamIdentifier: string;
    appLaunchURL?: string;
    associatedStoreIdentifiers?: number[];
    userInfo?: {
        [key: string]: Object;
    };
    expirationDate?: Date;
    voided?: boolean;
    beacons?: PassKit.Beacon[];
    locations?: PassKit.Location[];
    maxDistance?: number;
    relevantDate?: Date;
    boardingPass?: PassKit.Pass;
    coupon?: PassKit.Pass;
    eventTicket?: PassKit.Pass;
    generic?: PassKit.Pass;
    storeCard?: PassKit.Pass;
    barcode?: PassKit.Barcode;
    barcodes?: PassKit.Barcode[];
    backgroundColor?: PassKit.RGB;
    foregroundColor?: PassKit.RGB;
    groupingIdentifier?: string;
    labelColor?: PassKit.RGB;
    logoText?: string;
    suppressStripShine?: boolean;
    authenticationToken?: string;
    webServiceURL?: string;
    nfc?: PassKit.NFC;
    constructor(style: PassKit.Style, pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string);
    validate(): void;
    toPass(): {
        [key: string]: any;
    };
}
