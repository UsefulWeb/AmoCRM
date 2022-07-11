"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasGetById = void 0;
const tslib_1 = require("tslib");
function hasGetById(Base) {
    return class HasGetById extends Base {
        getById(identity, criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl('/' + identity);
                const request = this.getRequest();
                const { data } = yield request.get(url, criteria, options);
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
exports.hasGetById = hasGetById;
//# sourceMappingURL=hasGetById.js.map