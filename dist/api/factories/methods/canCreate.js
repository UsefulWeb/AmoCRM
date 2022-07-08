"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canCreate = void 0;
const tslib_1 = require("tslib");
function canCreate(factory) {
    return function create(criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = factory.getUrl();
            const requestCriteria = factory.getEntityCriteria(criteria);
            const { data } = yield factory.getRequest().post(url, requestCriteria, options);
            const { _embedded = {} } = data;
            const response = _embedded[factory.getEmbeddedKey()] || [];
            const result = response.map((attributes, index) => {
                const entityCriteria = criteria[index];
                const instance = entityCriteria instanceof factory.getEntityClass() ?
                    entityCriteria :
                    factory.from(entityCriteria);
                instance.id = attributes.id;
                return instance;
            });
            factory.emit('create');
            return result;
        });
    };
}
exports.canCreate = canCreate;
//# sourceMappingURL=canCreate.js.map