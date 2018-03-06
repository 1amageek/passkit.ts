"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassKit = require("./index");
/// Template
class Template {
    /// constructor
    constructor(pass, organizationName, description, serialNumber) {
        this.formatVersion = 1;
        this.passTypeIdentifier = PassKit.certtificates.options.passTypeIdentifier;
        this.teamIdentifier = PassKit.certtificates.options.teamIdentifier;
        this.organizationName = organizationName;
        this.description = description;
        this.serialNumber = serialNumber;
    }
    toPass() {
        const pass = {};
        for (const key in this) {
            const value = this[key];
            if (value instanceof PassKit.RGB) {
                pass[key] = value.getValue();
            }
            else {
                pass[key] = value;
            }
        }
        return pass;
    }
}
exports.default = Template;
//# sourceMappingURL=template.js.map