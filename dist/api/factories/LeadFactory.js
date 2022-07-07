"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLeadFactory = void 0;
const tslib_1 = require("tslib");
/**
 * Фабрика для создания сделок {@link Lead}
 * */
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Lead_1 = tslib_1.__importDefault(require("../activeRecords/Lead"));
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const canGetByCriteria_1 = require("./mixins/canGetByCriteria");
const canGetById_1 = require("./mixins/canGetById");
const canCreate_1 = require("./mixins/canCreate");
const canUpdate_1 = require("./mixins/canUpdate");
/**
 * Фабрика управления сделками
 * */
class BaseLeadFactory extends ResourceFactory_1.default {
    createEntity() {
        return new Lead_1.default(this);
    }
    getBaseUrl() {
        return v4_1.default.entities.leads.path;
    }
    getEmbedded() {
        return 'leads';
    }
    /**
     * @todo https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-complex-add
     * */
    complexCreate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.BaseLeadFactory = BaseLeadFactory;
let LeadFactory = (0, canGetByCriteria_1.canGetByCriteria)(BaseLeadFactory);
LeadFactory = (0, canGetById_1.canGetById)(LeadFactory);
LeadFactory = (0, canCreate_1.canCreate)(LeadFactory);
LeadFactory = (0, canUpdate_1.canUpdate)(LeadFactory);
exports.default = LeadFactory;
//# sourceMappingURL=LeadFactory.js.map