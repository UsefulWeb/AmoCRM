"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCreate = void 0;
const tslib_1 = require("tslib");
function hasCreate(Base) {
    return class HasCreate extends Base {
        create(options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const criteria = [this];
                const factory = this.getFactory();
                const [first] = yield factory.create(criteria, options);
                this.emit('create');
                return first;
            });
        }
    };
}
exports.hasCreate = hasCreate;
//# sourceMappingURL=hasCreate.js.map