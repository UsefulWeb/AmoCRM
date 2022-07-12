"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = exports.delay = void 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
/* eslint-disable  @typescript-eslint/no-explicit-any */
function applyMixins(baseClass, mixins) {
    return mixins.reduce((target, mixin) => {
        return mixin(target);
    }, baseClass);
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=util.js.map