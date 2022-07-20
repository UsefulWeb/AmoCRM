"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadFactory = exports.BaseLeadFactory = void 0;
const tslib_1 = require("tslib");
/**
 * Фабрика для создания сделок {@link Lead}
 * */
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Lead_1 = require("../activeRecords/Lead");
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const hasGetByCriteria_1 = require("./mixins/hasGetByCriteria");
const hasGetById_1 = require("./mixins/hasGetById");
const hasCreate_1 = require("./mixins/hasCreate");
const hasUpdate_1 = require("./mixins/hasUpdate");
const util_1 = require("../../util");
/**
 * Фабрика управления сделками
 * */
class BaseLeadFactory extends ResourceFactory_1.default {
    getEntityClass() {
        return Lead_1.Lead;
    }
    getBaseUrl() {
        return v4_1.default.entities.leads.path;
    }
    getEmbeddedKey() {
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
exports.LeadFactory = (0, util_1.applyMixins)(BaseLeadFactory, [
    hasGetByCriteria_1.hasGetByCriteria,
    hasGetById_1.hasGetById,
    hasCreate_1.hasCreate,
    hasUpdate_1.hasUpdate
]);
//# sourceMappingURL=LeadFactory.js.map