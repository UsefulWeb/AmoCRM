"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasGetByCriteria = void 0;
const tslib_1 = require("tslib");
const ResourcePagination_1 = tslib_1.__importDefault(require("../../ResourcePagination"));
function hasGetByCriteria(Base) {
    return class HasGetWithCriteria extends Base {
        get(criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl();
                const params = {
                    url,
                    criteria,
                    options,
                    factory: this,
                    embedded: this.getEmbeddedKey()
                };
                const pagination = new ResourcePagination_1.default(this.getRequest(), params);
                yield pagination.fetch();
                this.emit('get');
                return pagination;
            });
        }
    };
}
exports.hasGetByCriteria = hasGetByCriteria;
//# sourceMappingURL=hasGetByCriteria.js.map