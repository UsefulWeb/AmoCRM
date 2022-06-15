"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Сделка (сущность)
 */
const ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
/**
 * Сделка
 */
class Lead extends ResourceEntity_1.default {
    getAttributes() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            status_id: this.status_id,
            pipeline_id: this.pipeline_id,
            loss_reason_id: this.loss_reason_id,
            source_id: this.source_id,
            created_by: this.created_by,
            updated_at: this.updated_at,
            closed_task_at: this.closed_task_at,
            is_deleted: this.is_deleted,
            custom_fields_values: this.custom_fields_values,
            score: this.score,
            account_id: this.account_id,
            is_price_modified_by_robot: this.is_price_modified_by_robot,
            _embedded: this._embedded
        };
    }
    setAttributes(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.price = attributes.price;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.status_id = attributes.status_id;
        this.pipeline_id = attributes.pipeline_id;
        this.loss_reason_id = attributes.loss_reason_id;
        this.source_id = attributes.source_id;
        this.created_by = attributes.created_by;
        this.updated_by = attributes.updated_by;
        this.closed_task_at = attributes.closed_task_at;
        this.is_deleted = attributes.is_deleted;
        this.custom_fields_values = attributes.custom_fields_values;
        this.score = attributes.score;
        this.account_id = attributes.account_id;
        this.is_price_modified_by_robot = attributes.is_price_modified_by_robot;
        this._embedded = attributes._embedded;
    }
    /**
     * @returns присутствует ли сущность на портале AmoCRM
     * */
    isNew() {
        return this.id !== undefined;
    }
    /**
     * Добавляет сущность на портал AmoCRM
     * @example
     * ```ts
     * const lead = new client.Lead({
     *     name: "Walter White"
     * });
     * await lead.create();
     * ```
     * @example
     * ```ts
     * const lead = new client.Lead;
     * lead.name = "Walter White";
     * await lead.create();
     * ```
     * @returns ссылка на созданную сущность
     * */
    create(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const criteria = [this];
            const [lead] = yield this.factory.create(criteria, options);
            this.emit('create');
            return lead;
        });
    }
    /**
     * Обновляет сущность на портале AmoCRM.
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = await client.leads.getById(123);
     * lead.name = "Walter White";
     * await lead.update();
     * ```
     * @returns ссылка на обновлённую сущность
     * */
    update(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const criteria = [this];
            const [lead] = yield this.factory.update(criteria, options);
            this.emit('update');
            return lead;
        });
    }
    /**
     * Создаёт или сохраняет сущность, в зависимости от результата {@link isNew()}
     * @param options настройки запроса и обработки результата
     * */
    save(options) {
        if (this.isNew()) {
            return this.create(options);
        }
        return this.update(options);
    }
    /**
     * Получает содержимое сущности на портале
     * @param criteria фильтр для уточнения результатов запроса
     * @param options настройки запроса и обработки результата
     * @example
     * ```ts
     * const lead = new client.Lead({ id: 123 });
     * await lead.fetch();
     * ```
     * */
    fetch(criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.isNew()) {
                return false;
            }
            const id = this.id;
            const lead = yield this.factory.getById(id, criteria, options);
            this.emit('fetch');
            return lead;
        });
    }
}
exports.default = Lead;
//# sourceMappingURL=Lead.js.map