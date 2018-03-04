"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
class EventTicket extends template_1.default {
    constructor(basic, asset, pass, description, serialNumber) {
        super(basic, asset, pass, description, serialNumber);
        this.description = description;
        this.serialNumber = serialNumber;
        this.eventTicket = pass;
    }
}
exports.EventTicket = EventTicket;
//# sourceMappingURL=eventTicket.js.map