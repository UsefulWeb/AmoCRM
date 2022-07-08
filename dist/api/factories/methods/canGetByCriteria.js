"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canGetByCriteria = void 0;
const tslib_1 = require("tslib");
const ResourcePagination_1 = tslib_1.__importDefault(require("../../ResourcePagination"));
function canGetByCriteria(factory) {
    return function get(criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = factory.getUrl();
            const params = {
                url,
                criteria,
                options,
                factory,
                embedded: factory.getEmbeddedKey()
            };
            const pagination = new ResourcePagination_1.default(factory.getRequest(), params);
            yield pagination.fetch();
            factory.emit('get');
            return pagination;
        });
    };
}
exports.canGetByCriteria = canGetByCriteria;
//# sourceMappingURL=canGetByCriteria.js.map