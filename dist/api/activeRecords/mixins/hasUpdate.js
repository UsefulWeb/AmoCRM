"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUpdate = void 0;
const tslib_1 = require("tslib");
function hasUpdate(Base) {
    return class HasUpdate extends Base {
        update(options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const criteria = [this];
                const [lead] = yield this.getFactory().update(criteria, options);
                this.emit('update');
                return lead;
            });
        }
    };
}
exports.hasUpdate = hasUpdate;
//# sourceMappingURL=hasUpdate.js.map