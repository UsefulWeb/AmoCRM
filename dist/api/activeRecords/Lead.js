"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ResourceEntity_1 = tslib_1.__importDefault(require("../ResourceEntity"));
var fillable_1 = tslib_1.__importDefault(require("./decorators/fillable"));
var Lead = /** @class */ (function (_super) {
    tslib_1.__extends(Lead, _super);
    function Lead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", String)
    ], Lead.prototype, "name", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "price", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "responsible_user_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "group_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "status_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "pipeline_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "loss_reason_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "source_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "created_by", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "updated_by", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "closed_at", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "created_at", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "updated_at", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "closed_task_at", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Boolean)
    ], Lead.prototype, "is_deleted", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Object)
    ], Lead.prototype, "custom_fields_values", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Object)
    ], Lead.prototype, "score", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Number)
    ], Lead.prototype, "account_id", void 0);
    tslib_1.__decorate([
        (0, fillable_1.default)(),
        tslib_1.__metadata("design:type", Boolean)
    ], Lead.prototype, "is_price_modified_by_robot", void 0);
    return Lead;
}(ResourceEntity_1.default));
exports.default = Lead;
//# sourceMappingURL=Lead.js.map