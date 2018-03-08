"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassKit = require("./index");
const template_1 = require("./template");
class StoreCard extends template_1.default {
    constructor(pass, organizationName, description, serialNumber) {
        super(PassKit.Style.storeCard, pass, organizationName, description, serialNumber);
    }
}
exports.default = StoreCard;
//# sourceMappingURL=storeCard.js.map