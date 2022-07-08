"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canCreate = void 0;
const tslib_1 = require("tslib");
function canCreate(Base) {
    return class CanCreate extends Base {
        create(criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl();
                const requestCriteria = this.getEntityCriteria(criteria);
                const { data } = yield this.getRequest().post(url, requestCriteria, options);
                const response = this.getEmbedded(data);
                const result = response.map((attributes, index) => {
                    const entityCriteria = criteria[index];
                    const instance = entityCriteria instanceof this.getEntityClass() ?
                        entityCriteria :
                        this.from(entityCriteria);
                    instance.id = attributes.id;
                    return instance;
                });
                this.emit('create');
                return result;
            });
        }
    };
}
exports.canCreate = canCreate;
//# sourceMappingURL=canCreate.js.map