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
const path_1 = require("path");
const os = require("os");
const mkdirp = require("mkdirp-promise");
/// Template
class Template {
    /// constructro
    constructor(basic, asset, pass, description, serialNumber) {
        this.formatVersion = 1;
        this.passTypeIdentifier = basic.passTypeIdentifier;
        this.teamIdentifier = basic.teamIdentifier;
        this.organizationName = basic.organizationName;
        this.description = description;
        this.serialNumber = serialNumber;
        this.asset = asset;
    }
    toJSON() {
        // console.log("")
    }
    createPass() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.serialNumber;
            const tempLocalFile = path_1.path.join(os.tmpdir(), filePath);
            const tempLocalDir = path_1.path.dirname(tempLocalFile);
            yield mkdirp(tempLocalDir);
        });
    }
}
exports.default = Template;
//# sourceMappingURL=template.js.map