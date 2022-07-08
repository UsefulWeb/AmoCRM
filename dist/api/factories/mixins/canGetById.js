"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canGetById = void 0;
const tslib_1 = require("tslib");
function canGetById(Base) {
    return class CanGetById extends Base {
        getById(identity, criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl('/' + identity);
                const { data } = yield this.getRequest().get(url, criteria, options);
                if (!data) {
                    return null;
                }
                const instance = this.createEntity();
                instance.setAttributes(data);
                this.emit('getById');
                return instance;
            });
        }
    };
}
exports.canGetById = canGetById;
//# sourceMappingURL=canGetById.js.map