"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
var Lead_1 = tslib_1.__importDefault(require("../activeRecords/Lead"));
var v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
var ResourcePagination_1 = tslib_1.__importDefault(require("../ResourcePagination"));
var LeadFactory = /** @class */ (function (_super) {
    tslib_1.__extends(LeadFactory, _super);
    function LeadFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityClass = Lead_1.default;
        return _this;
    }
    LeadFactory.prototype.get = function (criteria) {
        if (criteria === void 0) { criteria = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, params, pagination;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = v4_1.default.entities.leads.path;
                        params = {
                            url: url,
                            criteria: criteria,
                            factory: this,
                            embedded: 'leads'
                        };
                        pagination = new ResourcePagination_1.default(this.request, params);
                        return [4 /*yield*/, pagination.fetch()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, pagination];
                }
            });
        });
    };
    LeadFactory.prototype.getById = function (id, criteria) {
        if (criteria === void 0) { criteria = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return LeadFactory;
}(ResourceFactory_1.default));
exports.default = LeadFactory;
//# sourceMappingURL=LeadFactory.js.map