"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventTicket = require("./eventTicket");
exports.EventTicket = EventTicket;
class BasicInformation {
}
exports.BasicInformation = BasicInformation;
/// TransitType
var TransitType;
(function (TransitType) {
    TransitType["Air"] = "PKTransitTypeAir";
    TransitType["Boat"] = "PKTransitTypeBoat";
    TransitType["Bus"] = "PKTransitTypeBus";
    TransitType["Generic"] = "PKTransitTypeGeneric";
    TransitType["Train"] = "PKTransitTypeTrain";
})(TransitType = exports.TransitType || (exports.TransitType = {}));
/// Date Style 
var DateStyle;
(function (DateStyle) {
    DateStyle["None"] = "PKDateStyleNone";
    DateStyle["Short"] = "PKDateStyleShort";
    DateStyle["Medium"] = "PKDateStyleMedium";
    DateStyle["Long"] = "PKDateStyleLong";
    DateStyle["Full"] = "PKDateStyleFull";
})(DateStyle = exports.DateStyle || (exports.DateStyle = {}));
/// Number Style
var NumberStyle;
(function (NumberStyle) {
    NumberStyle["Decimal"] = "PKNumberStyleDecimal";
    NumberStyle["Percent"] = "PKNumberStylePercent";
    NumberStyle["Scientific"] = "PKNumberStyleScientific";
    NumberStyle["SpellOut"] = "PKNumberStyleSpellOut";
})(NumberStyle = exports.NumberStyle || (exports.NumberStyle = {}));
/// Barcode format
var BarcodeFormat;
(function (BarcodeFormat) {
    BarcodeFormat["QR"] = "PKBarcodeFormatQR";
    BarcodeFormat["PDF417"] = "PKBarcodeFormatPDF417";
    BarcodeFormat["Aztec"] = "PKBarcodeFormatAztec";
    BarcodeFormat["Code128"] = "PKBarcodeFormatCode128";
})(BarcodeFormat = exports.BarcodeFormat || (exports.BarcodeFormat = {}));
/// RGB class
class RGB {
    constructor() {
        this.r = 255;
        this.g = 255;
        this.b = 255;
    }
    getValue() {
        return `rgb(${this.r},${this.g},${this.b}}`;
    }
}
exports.RGB = RGB;
/// DataDetectorTypes
var DataDetectorTypes;
(function (DataDetectorTypes) {
    DataDetectorTypes["PhoneNumber"] = "PKDataDetectorTypePhoneNumber";
    DataDetectorTypes["Link"] = "PKDataDetectorTypeLink";
    DataDetectorTypes["Address"] = "PKDataDetectorTypeAddress";
    DataDetectorTypes["CalendarEvent"] = "PKDataDetectorTypeCalendarEvent";
})(DataDetectorTypes = exports.DataDetectorTypes || (exports.DataDetectorTypes = {}));
/// TextAlignment
var TextAlignment;
(function (TextAlignment) {
    TextAlignment["Left"] = "PKTextAlignmentLeft";
    TextAlignment["Center"] = "PKTextAlignmentCenter";
    TextAlignment["Right"] = "PKTextAlignmentRight";
    TextAlignment["Natural"] = "PKTextAlignmentNatural";
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
//# sourceMappingURL=index.js.map