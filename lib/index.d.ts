import EventTicket from './eventTicket';
import Assets from './assets';
import Template from './template';
export { Assets, EventTicket };
export interface CertificateLodingDelegate {
    loadSecret(identifier: string): Promise<string>;
    loadWWDR(): Promise<string>;
}
export declare type Options = {
    passTypeIdentifier: string;
    teamIdentifier: string;
    secretURL?: string;
    wwdrURL?: string;
    password: string;
    delegate?: CertificateLodingDelegate;
};
export declare class Certificates {
    secret?: string;
    wwdr?: string;
    options: Options;
    constructor(options: Options);
    loadCertificate(url: any, destination: any): Promise<string>;
    loadIfNeeded(): Promise<void>;
    isExistFile(file: string): boolean;
}
export declare let certtificates: Certificates;
export declare const initialize: (options?: Options) => void;
export declare enum TransitType {
    Air = "PKTransitTypeAir",
    Boat = "PKTransitTypeBoat",
    Bus = "PKTransitTypeBus",
    Generic = "PKTransitTypeGeneric",
    Train = "PKTransitTypeTrain",
}
export declare type Field = {
    attributedValue: any;
    changeMessage: string;
    dataDetectorTypes: DataDetectorTypes[];
    key: string;
    label?: string;
    textAlignment?: TextAlignment;
    value: any;
};
export declare type DateField = {
    dateStyle: DateStyle;
    ignoresTimeZone: boolean;
    isRelative: boolean;
    timeStyle: DateStyle;
};
export declare enum DateStyle {
    None = "PKDateStyleNone",
    Short = "PKDateStyleShort",
    Medium = "PKDateStyleMedium",
    Long = "PKDateStyleLong",
    Full = "PKDateStyleFull",
}
export declare type NumberField = {
    currencyCode: string;
    numberStyle: NumberStyle;
};
export declare enum NumberStyle {
    Decimal = "PKNumberStyleDecimal",
    Percent = "PKNumberStylePercent",
    Scientific = "PKNumberStyleScientific",
    SpellOut = "PKNumberStyleSpellOut",
}
export declare type Pass = {
    headerFields?: Field[];
    primaryFields?: Field[];
    secondaryFields?: Field[];
    auxiliaryFields?: Field[];
    backFields?: Field[];
    transitType?: TransitType;
};
export declare type Beacon = {
    major: string;
    minor: string;
    proximityUUID: string;
    relevantText: string;
};
export declare type Location = {
    altitude?: number;
    latitude: number;
    longitude: number;
    relevantText?: string;
};
export declare enum BarcodeFormat {
    QR = "PKBarcodeFormatQR",
    PDF417 = "PKBarcodeFormatPDF417",
    Aztec = "PKBarcodeFormatAztec",
    Code128 = "PKBarcodeFormatCode128",
}
export declare type Barcode = {
    altText?: string;
    format: string;
    message: string;
    messageEncoding: string;
};
export declare type NFC = {
    message: string;
    encryptionPublicKey?: string;
};
export declare class RGB {
    r: number;
    g: number;
    b: number;
    getValue(): string;
}
export declare enum DataDetectorTypes {
    PhoneNumber = "PKDataDetectorTypePhoneNumber",
    Link = "PKDataDetectorTypeLink",
    Address = "PKDataDetectorTypeAddress",
    CalendarEvent = "PKDataDetectorTypeCalendarEvent",
}
export declare enum TextAlignment {
    Left = "PKTextAlignmentLeft",
    Center = "PKTextAlignmentCenter",
    Right = "PKTextAlignmentRight",
    Natural = "PKTextAlignmentNatural",
}
export declare const generate: (template: Template, assets: Assets) => Promise<any>;
