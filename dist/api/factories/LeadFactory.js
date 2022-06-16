"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Фабрика для создания сделок {@link Lead}
 * */
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Lead_1 = tslib_1.__importDefault(require("../activeRecords/Lead"));
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const ResourcePagination_1 = tslib_1.__importDefault(require("../ResourcePagination"));
const ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
/**
 * Основной класс фабрики
 * */
class LeadFactory extends ResourceFactory_1.default {
    createEntity() {
        return new Lead_1.default(this);
    }
    /**
     * @param criteria фильтр сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-list)
     * @example
     * ```ts
     * const pagination = await client.leads.get({
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
     * const pagination = await client.leads.get()
     * const data = pagination.getData(); // [lead, lead]
     * const page = pagination.getPage();
     *
     * await pagination.next();
     *
     * const nextData = pagination.data();
     * ```
     *
     * Метод {@link ResourcePagination.getData | getData()} навигации вернёт массив объектов {@link Lead}
     *
     * */
    get(criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = v4_1.default.entities.leads.path;
            const params = {
                url,
                criteria,
                options,
                factory: this,
                embedded: 'leads'
            };
            const pagination = new ResourcePagination_1.default(this.request, params);
            yield pagination.fetch();
            this.emit('get');
            return pagination;
        });
    }
    /**
     * Находит сделку по её id
     * @param identity id сделки
     * @param criteria параметры получения сделки (https://www.amocrm.ru/developers/content/crm_platform/leads-api#lead-detail)
     * @example
     * ```ts
     * const lead = client.leads.getById(123, {
     *     with: 'catalog_elements'
     * })
     * ```
     * @param options настройки запроса и обработки результата
     * @returns экземпляр найденной сделки или null, если сделка не найдена.
     * */
    getById(identity, criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = v4_1.default.entities.leads.path + '/' + identity;
            const { data } = yield this.request.get(url, criteria, options);
            if (!data) {
                return null;
            }
            const lead = this.createEntity();
            lead.setAttributes(data);
            return lead;
        });
    }
    /**
     * Создаёт новые сделки
     * @param criteria параметры создания сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-add)
     * и/или массив объектов {@link Lead}
     * @example
     * ```ts
     * const leads = await client.leads.create([
     *  {
     *      name: "Lead 1"
     *  },
     *  {
     *      name: "Lead 2"
     *  }
     * ])
     * ```
     *
     * @example
     * ```ts
     * const lead1 = new client.Lead;
     * lead1.name = 'Lead 1';
     * const lead2 = new client.Lead;
     * lead2.name = 'Lead 2';
     *
     * await client.leads.create([lead1, lead2])
     * ```
     *
     * @example
     * ```ts
     * const leads = await client.leads.create([
     *  new client.Lead({
     *      name: "Lead 1"
     *  }),
     *  {
     *      name: "Lead 2"
     *  }
     * ]);
     * ```
     *
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Lead}. Если в параметр criteria передавались экземпляры {@link Lead}, после
     * создания сделок в AmoCRM, у них обновится поле id
     *
     * @example
     * ```ts
     * const lead1 = new client.Lead;
     * lead1.name = 'Lead 1';
     * lead1.id; // undefined;
     *
     * await client.leads.create([lead1])
     *
     * lead1.id; // 123
     * ```
     * */
    create(criteria, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = v4_1.default.entities.leads.path;
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = yield this.request.post(url, requestCriteria, options);
            const response = ((_a = data === null || data === void 0 ? void 0 : data._embedded) === null || _a === void 0 ? void 0 : _a.leads) || [];
            const result = response.map((attributes, index) => {
                const entityCriteria = criteria[index];
                const lead = entityCriteria instanceof ResourceEntity_1.default ?
                    entityCriteria :
                    this.from(entityCriteria);
                lead.id = attributes.id;
                return lead;
            });
            return result;
        });
    }
    /**
     * @todo https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-complex-add
     * */
    complexCreate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    /**
     * Обновляет существующие сделки. Принцип работы метода аналогичен {@link create}
     * @param criteria параметры обновления сделок (https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-edit)
     * и/или массив объектов {@link Lead}
     * @param options настройки запроса и обработки результата
     * @returns массив объектов {@link Lead}. Если в параметр criteria передавались экземпляры {@link Lead}, после
     * создания сделок в AmoCRM, у них обновится поле id
     * */
    update(criteria, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = v4_1.default.entities.leads.path;
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = yield this.request.patch(url, requestCriteria, options);
            const response = ((_a = data === null || data === void 0 ? void 0 : data._embedded) === null || _a === void 0 ? void 0 : _a.leads) || [];
            const result = response.map((attributes, index) => {
                const entityCriteria = criteria[index];
                const lead = entityCriteria instanceof Lead_1.default ?
                    entityCriteria :
                    this.from(entityCriteria);
                lead.id = attributes.id;
                lead.updated_at = attributes.updated_at;
                return lead;
            });
            return result;
        });
    }
}
exports.default = LeadFactory;
//# sourceMappingURL=LeadFactory.js.map