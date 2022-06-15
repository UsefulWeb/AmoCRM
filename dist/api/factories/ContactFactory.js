"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Contact_1 = tslib_1.__importDefault(require("../activeRecords/Contact"));
const ResourcePagination_1 = tslib_1.__importDefault(require("../ResourcePagination"));
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
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
}
exports.default = ContactFactory;
//# sourceMappingURL=ContactFactory.js.map