"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Contact_1 = tslib_1.__importDefault(require("../activeRecords/Contact"));
const ResourcePagination_1 = tslib_1.__importDefault(require("../ResourcePagination"));
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
/**
 * Фабрика управления контактами
 * */
class ContactFactory extends ResourceFactory_1.default {
    createEntity() {
        return new Contact_1.default(this);
    }
    getBaseUrl() {
        return v4_1.default.entities.contacts.path;
    }
    /**
     * @param criteria фильтр контактов (https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-list)
     * @example
     * ```ts
     * const pagination = await client.contacts.get({
     *     order: 'created_at',
     *     page: 2,
     *     query: 'Иванов'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns постраничную навигацию, экземпляр {@link ResourcePagination}
     *
     * @example
     * ```ts
     * const pagination = await client.contacts.get()
     * const data = pagination.getData(); // [contact, contact]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Contact}
     * */
    get(criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl();
            const params = {
                url,
                criteria,
                options,
                factory: this,
                embedded: 'contacts'
            };
            const pagination = new ResourcePagination_1.default(this.request, params);
            yield pagination.fetch();
            this.emit('get');
            return pagination;
        });
    }
    getById(identity, criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl('/' + identity);
            const { data } = yield this.request.get(url, criteria, options);
            if (!data) {
                return null;
            }
            const contact = this.createEntity();
            contact.setAttributes(data);
            return contact;
        });
    }
    create(criteria, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = yield this.request.post(url, requestCriteria, options);
            const response = ((_a = data === null || data === void 0 ? void 0 : data._embedded) === null || _a === void 0 ? void 0 : _a.contacts) || [];
            const result = response.map((attributes, index) => {
                const entityCriteria = criteria[index];
                const contact = entityCriteria instanceof ResourceEntity_1.default ?
                    entityCriteria :
                    this.from(entityCriteria);
                contact.id = attributes.id;
                return contact;
            });
            return result;
        });
    }
    update(criteria, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = yield this.request.patch(url, requestCriteria, options);
            const response = ((_a = data === null || data === void 0 ? void 0 : data._embedded) === null || _a === void 0 ? void 0 : _a.contacts) || [];
            const result = response.map((attributes, index) => {
                const entityCriteria = criteria[index];
                const contact = entityCriteria instanceof Contact_1.default ?
                    entityCriteria :
                    this.from(entityCriteria);
                contact.id = attributes.id;
                contact.updated_at = attributes.updated_at;
                return contact;
            });
            return result;
        });
    }
}
exports.default = ContactFactory;
//# sourceMappingURL=ContactFactory.js.map