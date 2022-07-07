"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = exports.delay = void 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=util.js.map