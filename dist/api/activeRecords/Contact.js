"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Сделка (сущность)
 */
const ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
class Contact extends ResourceEntity_1.default {
    getAttributes() {
        return {
            id: this.id,
            name: this.name,
            first_name: this.first_name,
            last_name: this.last_name,
            responsible_user_id: this.responsible_user_id,
            group_id: this.group_id,
            created_by: this.created_by,
            updated_at: this.updated_at,
            is_deleted: this.is_deleted,
            closed_task_at: this.closed_task_at,
            custom_fields_values: this.custom_fields_values,
            account_id: this.account_id,
            _embedded: this._embedded
        };
    }
    setAttributes(attributes = {}) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.first_name = attributes.first_name;
        this.last_name = attributes.last_name;
        this.responsible_user_id = attributes.responsible_user_id;
        this.group_id = attributes.group_id;
        this.created_by = attributes.created_by;
        this.updated_at = attributes.updated_at;
        this.is_deleted = attributes.is_deleted;
        this.closed_task_at = attributes.closed_task_at;
        this.custom_fields_values = attributes.custom_fields_values;
        this.account_id = attributes.account_id;
        this._embedded = attributes._embedded;
    }
}
exports.default = Contact;
//# sourceMappingURL=Contact.js.map