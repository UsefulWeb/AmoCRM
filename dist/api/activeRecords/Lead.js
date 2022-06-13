"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Сделка (сущность)
 */
const ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
const fillable_1 = require("./decorators/fillable");
class Lead extends ResourceEntity_1.default {
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
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "name", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "price", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "responsible_user_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "group_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "status_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "pipeline_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "loss_reason_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "source_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "created_by", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "updated_by", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "closed_at", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "closed_task_at", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Boolean)
], Lead.prototype, "is_deleted", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Object)
], Lead.prototype, "custom_fields_values", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Object)
], Lead.prototype, "score", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "account_id", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Boolean)
], Lead.prototype, "is_price_modified_by_robot", void 0);
tslib_1.__decorate([
    (0, fillable_1.fillable)(),
    tslib_1.__metadata("design:type", Object)
], Lead.prototype, "_embedded", void 0);
exports.default = Lead;
//# sourceMappingURL=Lead.js.map