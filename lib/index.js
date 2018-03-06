"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const https = require("https");
const mkdirp = require("mkdirp-promise");
const Archiver = require("archiver-promise");
const eventTicket_1 = require("./eventTicket");
exports.EventTicket = eventTicket_1.default;
const assets_1 = require("./assets");
exports.Assets = assets_1.default;
const manifest_1 = require("./manifest");
function initialize(options) {
    exports.certtificates = new Certificates(options);
}
exports.initialize = initialize;
const tmpDir = `${process.cwd()}/temp`;
class Certificates {
    constructor(options) {
        this.options = options;
    }
    loadCertificate(url, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeStream = fs.createWriteStream(destination);
            return new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    res.pipe(writeStream);
                })
                    .on('close', () => {
                    resolve(destination);
                });
            });
        });
    }
    loadIfNeeded() {
        return __awaiter(this, void 0, void 0, function* () {
            const secretDir = `${tmpDir}/keys`;
            /// load secret
            if (!this.isExistFile(this.secret)) {
                const identifier = this.options.passTypeIdentifier.replace(/^pass./, "");
                const destination = path.resolve(secretDir, `${identifier}.pem`);
                const tempLocalDir = path.dirname(destination);
                yield mkdirp(tempLocalDir);
                this.secret = yield this.loadCertificate(this.options.secretURL, destination);
            }
            /// load wwdr
            if (!this.isExistFile(this.wwdr)) {
                const identifier = this.options.passTypeIdentifier.replace(/^pass./, "");
                const destination = path.resolve(secretDir, `wwdr.pem`);
                this.wwdr = yield this.loadCertificate(this.options.wwdrURL, destination);
            }
        });
    }
    isExistFile(file) {
        try {
            fs.statSync(file);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.Certificates = Certificates;
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
const loadImage = (url, destination) => __awaiter(this, void 0, void 0, function* () {
    const writeStream = fs.createWriteStream(destination);
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.pipe(writeStream);
        })
            .on('close', () => {
            const data = fs.readFileSync(destination);
            resolve(data);
        });
    });
});
exports.generate = (template, assets) => __awaiter(this, void 0, void 0, function* () {
    assets.validate();
    const manifest = new manifest_1.default();
    const filePath = `/passkit/${template.serialNumber}`;
    const tempLocalFile = path.join(tmpDir, `${filePath}/pass.zip`);
    const tempLocalDir = path.dirname(tempLocalFile);
    yield mkdirp(tempLocalDir);
    const archive = Archiver(tempLocalFile, { store: true });
    const buffer = new Buffer(JSON.stringify(template.toPass()), 'utf-8');
    // Add pass.json
    const passName = 'pass.json';
    yield manifest.addFile(buffer, passName);
    archive.append(buffer, { name: passName });
    // Add images
    for (const key in assets) {
        const filename = `${key.replace('2x', '@2x')}.png`;
        const url = assets[key];
        const destination = path.join(tempLocalDir, filename);
        try {
            const data = yield loadImage(url, destination);
            yield manifest.addFile(data, filename);
            archive.append(data, { name: filename });
            fs.unlinkSync(destination);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // Add manifest
    const manifestBuffer = new Buffer(JSON.stringify(manifest.toJSON()), 'utf-8');
    archive.append(manifestBuffer, { name: 'manifest.json' });
    // Add signature
    const signature = yield manifest.sign(template.passTypeIdentifier, manifestBuffer);
    archive.append(signature, { name: "signature" });
    return yield archive.finalize();
});
//# sourceMappingURL=index.js.map