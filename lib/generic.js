"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassKit = require("./index");
const template_1 = require("./template");
class Generic extends template_1.default {
    constructor(pass, organizationName, description, serialNumber) {
        super(PassKit.Style.generic, pass, organizationName, description, serialNumber);
    }
}
exports.default = Generic;
//# sourceMappingURL=generic.js.map