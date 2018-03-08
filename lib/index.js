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
const os = require("os");
const https = require("https");
const mkdirp = require("mkdirp-promise");
const Archiver = require("archiver");
const assets_1 = require("./assets");
exports.Assets = assets_1.default;
const manifest_1 = require("./manifest");
const boardingPass_1 = require("./boardingPass");
exports.BoardingPass = boardingPass_1.default;
const coupon_1 = require("./coupon");
exports.Coupon = coupon_1.default;
const eventTicket_1 = require("./eventTicket");
exports.EventTicket = eventTicket_1.default;
const generic_1 = require("./generic");
exports.Generic = generic_1.default;
const storeCard_1 = require("./storeCard");
exports.StoreCard = storeCard_1.default;
const tmpDir = process.env.NODE_ENV === 'production' ? `${os.tmpdir()}/passkit` : `${process.cwd()}/temp`;
var Style;
(function (Style) {
    Style["boardingPass"] = "boardingPass";
    Style["coupon"] = "coupon";
    Style["eventTicket"] = "eventTicket";
    Style["generic"] = "generic";
    Style["storeCard"] = "storeCard";
})(Style = exports.Style || (exports.Style = {}));
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
            if (!this.options.passTypeIdentifier) {
                console.log("There is no passTypeIdentifier.");
                return;
            }
            /// load secret
            if (!this.isExistFile(this.secret)) {
                const identifier = this.options.passTypeIdentifier.replace(/^pass./, "");
                if (this.options.delegate) {
                    try {
                        this.secret = yield this.options.delegate.loadSecret(identifier);
                    }
                    catch (error) {
                        throw error;
                    }
                }
                else {
                    const destination = path.resolve(secretDir, `${identifier}.pem`);
                    const tempLocalDir = path.dirname(destination);
                    yield mkdirp(tempLocalDir);
                    try {
                        this.secret = yield this.loadCertificate(this.options.secretURL, destination);
                    }
                    catch (error) {
                        throw error;
                    }
                }
            }
            /// load wwdr
            if (!this.isExistFile(this.wwdr)) {
                if (this.options.delegate) {
                    try {
                        this.wwdr = yield this.options.delegate.loadWWDR();
                    }
                    catch (error) {
                        throw error;
                    }
                }
                else {
                    const destination = path.resolve(secretDir, `wwdr.pem`);
                    try {
                        this.wwdr = yield this.loadCertificate(this.options.wwdrURL, destination);
                    }
                    catch (error) {
                        throw error;
                    }
                }
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
/// PassKit initialize
exports.initialize = (options) => {
    exports.certtificates = new Certificates(options);
};
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
    constructor(r, g, b) {
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getValue() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
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
    const filePath = `/pass/${template.serialNumber}`;
    const tempLocalFile = path.join(tmpDir, `${filePath}/pass.pkpass`);
    const tempLocalDir = path.dirname(tempLocalFile);
    yield mkdirp(tempLocalDir);
    const passWriteStream = fs.createWriteStream(tempLocalFile);
    const archive = Archiver('zip', { store: true });
    archive.pipe(passWriteStream);
    const buffer = new Buffer(JSON.stringify(template.toPass()), 'utf-8');
    // Add pass.json
    const passName = 'pass.json';
    yield manifest.addFile(buffer, passName, "utf8");
    archive.append(buffer, { name: passName });
    // Add images
    for (const key in assets) {
        const filename = `${key.replace('2x', '@2x')}.png`;
        const url = assets[key];
        const destination = path.join(tempLocalDir, filename);
        try {
            const data = yield loadImage(url, destination);
            archive.append(data, { name: filename });
            yield manifest.addFile(data, filename, "utf8");
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
    try {
        const signature = yield manifest.sign(template.passTypeIdentifier, manifestBuffer);
        archive.append(signature, { name: "signature" });
        yield archive.finalize();
        return tempLocalFile;
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=index.js.map