"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ResourcePagination = /** @class */ (function () {
    function ResourcePagination(request, params) {
        this.data = [];
        this.page = 1;
        this.request = request;
        this.params = params;
    }
    ResourcePagination.prototype.fetch = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var criteria, apiResponse, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url) {
                            url = this.params.url;
                        }
                        criteria = this.params.criteria;
                        return [4 /*yield*/, this.request.get(url, criteria)];
                    case 1:
                        apiResponse = _a.sent();
                        data = apiResponse.data;
                        this.page = data._page;
                        this.parseData(data);
                        this.parseLinks(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    ResourcePagination.prototype.next = function () {
        var _a;
        return this.fetch((_a = this.links) === null || _a === void 0 ? void 0 : _a.next);
    };
    ResourcePagination.prototype.first = function () {
        var _a;
        return this.fetch((_a = this.links) === null || _a === void 0 ? void 0 : _a.first);
    };
    ResourcePagination.prototype.prev = function () {
        var _a;
        return this.fetch((_a = this.links) === null || _a === void 0 ? void 0 : _a.prev);
    };
    ResourcePagination.prototype.parseLinks = function (response) {
        var links = response._links;
        this.links = {
            next: links.next.href,
            prev: links.prev.href,
            first: links.first.href
        };
    };
    ResourcePagination.prototype.parseData = function (response) {
        var _a = this.params, embedded = _a.embedded, factory = _a.factory;
        var data = response._embedded[embedded];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(function (attributes) { return factory.create(attributes); });
    };
    ResourcePagination.prototype.getPage = function () {
        return this.page;
    };
    ResourcePagination.prototype.getData = function () {
        return this.data;
    };
    return ResourcePagination;
}());
exports.default = ResourcePagination;
//# sourceMappingURL=ResourcePagination.js.map