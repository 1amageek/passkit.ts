"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
class EventTicket extends template_1.default {
    constructor(pass, organizationName, description, serialNumber) {
        super(pass, organizationName, description, serialNumber);
        this.eventTicket = pass;
    }
}
exports.default = EventTicket;
//# sourceMappingURL=eventTicket.js.map