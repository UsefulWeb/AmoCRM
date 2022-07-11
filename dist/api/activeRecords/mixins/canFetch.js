"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canFetch = void 0;
const tslib_1 = require("tslib");
function canFetch(Base) {
    return class CanFetch extends Base {
        fetch(criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (this.isNew()) {
                    return false;
                }
                const id = this.id;
                const lead = yield this.getFactory().getById(id, criteria, options);
                this.emit('fetch');
                return lead;
            });
        }
    };
}
exports.canFetch = canFetch;
//# sourceMappingURL=canFetch.js.map