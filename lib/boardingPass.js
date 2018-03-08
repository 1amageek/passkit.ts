"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassKit = require("./index");
const template_1 = require("./template");
class BoardingPass extends template_1.default {
    constructor(pass, organizationName, description, serialNumber) {
        super(PassKit.Style.boardingPass, pass, organizationName, description, serialNumber);
    }
}
exports.default = BoardingPass;
//# sourceMappingURL=boardingPass.js.map