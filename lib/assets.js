"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assets {
    validate() {
        const requireImages = ['logo', 'icon', 'logo2x', 'icon2x'];
        for (const key of requireImages) {
            if (!this[key]) {
                throw Error(`Missing image ${key}.png`);
            }
        }
    }
}
exports.default = Assets;
//# sourceMappingURL=assets.js.map