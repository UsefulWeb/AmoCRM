"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ResourceEntity_1 = tslib_1.__importDefault(require("./ResourceEntity"));
var ResourceFactory = /** @class */ (function () {
    function ResourceFactory(request) {
        this.entityClass = ResourceEntity_1.default;
        this.request = request;
    }
    ResourceFactory.prototype.create = function (attributes) {
        var instance = new this.entityClass(this.request);
        instance.setAttributes(attributes);
        return instance;
    };
    return ResourceFactory;
}());
exports.default = ResourceFactory;
//# sourceMappingURL=ResourceFactory.js.map