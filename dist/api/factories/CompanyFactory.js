"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCompanyFactory = void 0;
const tslib_1 = require("tslib");
/**
 * Фабрика для создания сделок {@link Company}
 * */
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Company_1 = require("../activeRecords/Company");
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const hasGetByCriteria_1 = require("./mixins/hasGetByCriteria");
const hasGetById_1 = require("./mixins/hasGetById");
const hasCreate_1 = require("./mixins/hasCreate");
const hasUpdate_1 = require("./mixins/hasUpdate");
const util_1 = require("../../util");
/**
 * Фабрика управления сделками
 * */
class BaseCompanyFactory extends ResourceFactory_1.default {
    getEntityClass() {
        return Company_1.Company;
    }
    getBaseUrl() {
        return v4_1.default.entities.companies.path;
    }
    getEmbeddedKey() {
        return 'companies';
    }
}
exports.BaseCompanyFactory = BaseCompanyFactory;
const CompanyFactory = (0, util_1.applyMixins)(BaseCompanyFactory, [
    hasGetByCriteria_1.hasGetByCriteria,
    hasGetById_1.hasGetById,
    hasCreate_1.hasCreate,
    hasUpdate_1.hasUpdate
]);
exports.default = CompanyFactory;
//# sourceMappingURL=CompanyFactory.js.map