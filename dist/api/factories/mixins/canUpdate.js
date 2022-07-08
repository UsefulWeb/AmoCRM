"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUpdate = void 0;
const tslib_1 = require("tslib");
function canUpdate(Base) {
    return class CanUpdate extends Base {
        update(criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl();
                const requestCriteria = this.getEntityCriteria(criteria);
                const { data } = yield this.getRequest().patch(url, requestCriteria, options);
                const response = this.getEmbedded(data);
                const result = response.map((attributes, index) => {
                    const entityCriteria = criteria[index];
                    const instance = entityCriteria instanceof this.getEntityClass() ?
                        entityCriteria :
                        this.from(entityCriteria);
                    instance.id = attributes.id;
                    instance.updated_at = attributes.updated_at;
                    return instance;
                });
                this.emit('update');
                return result;
            });
        }
    };
}
exports.canUpdate = canUpdate;
//# sourceMappingURL=canUpdate.js.map