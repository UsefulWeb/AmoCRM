"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUpdate = void 0;
const tslib_1 = require("tslib");
function hasUpdate(Base) {
    return class HasUpdate extends Base {
        update(criteria, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const url = this.getUrl();
                const requestCriteria = this.getEntityCriteria(criteria);
                const request = this.getRequest();
                const { data } = yield request.patch(url, requestCriteria, options);
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
exports.hasUpdate = hasUpdate;
//# sourceMappingURL=hasUpdate.js.map