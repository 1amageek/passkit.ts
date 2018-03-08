"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassKit = require("./index");
const template_1 = require("./template");
class Coupon extends template_1.default {
    constructor(pass, organizationName, description, serialNumber) {
        super(PassKit.Style.coupon, pass, organizationName, description, serialNumber);
    }
}
exports.default = Coupon;
//# sourceMappingURL=coupon.js.map