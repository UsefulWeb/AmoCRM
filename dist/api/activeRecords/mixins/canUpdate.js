"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUpdate = void 0;
const tslib_1 = require("tslib");
function canUpdate(Base) {
    return class CanUpdate extends Base {
        create(criteria, options) {
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
exports.canUpdate = canUpdate;
//# sourceMappingURL=canUpdate.js.map