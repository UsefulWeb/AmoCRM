"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fillable_1 = require("./activeRecords/decorators/fillable");
var ResourceEntity = /** @class */ (function () {
    function ResourceEntity(request) {
        this.required = [];
        this.request = request;
    }
    ResourceEntity.prototype.setAttributes = function (attributes) {
        if (!attributes) {
            return;
        }
        for (var attr in attributes) {
            var canFill = (0, fillable_1.isFillable)(this, attr);
            if ((0, fillable_1.isFillable)(this, attr)) {
                this[attr] = attributes[attr];
            }
        }
    };
    return ResourceEntity;
}());
exports.default = ResourceEntity;
//# sourceMappingURL=ResourceEntity.js.map