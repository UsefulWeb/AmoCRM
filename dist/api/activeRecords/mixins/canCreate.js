"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canCreate = void 0;
const tslib_1 = require("tslib");
function canCreate(Base) {
    return class CanCreate extends Base {
        create(options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const criteria = [this];
                const [first] = yield this.getFactory().create(criteria, options);
                this.emit('create');
                return first;
            });
        }
    };
}
exports.canCreate = canCreate;
//# sourceMappingURL=canCreate.js.map