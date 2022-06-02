"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ResourcePagination = /** @class */ (function () {
    function ResourcePagination(request, params) {
        this.data = [];
        this.links = {};
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
                        this.page = (data === null || data === void 0 ? void 0 : data._page) || 1;
                        this.parseData(data);
                        this.parseLinks(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    ResourcePagination.prototype.hasNext = function () {
        return Boolean(this.links.next);
    };
    ResourcePagination.prototype.hasFirst = function () {
        return Boolean(this.links.first);
    };
    ResourcePagination.prototype.hasPrev = function () {
        return Boolean(this.links.prev);
    };
    ResourcePagination.prototype.next = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNext()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.fetch(this.links.next)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResourcePagination.prototype.first = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasFirst()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.fetch(this.links.first)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResourcePagination.prototype.prev = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasPrev()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.fetch(this.links.prev)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResourcePagination.prototype.parseLinks = function (response) {
        var _a, _b, _c;
        var links = (response === null || response === void 0 ? void 0 : response._links) || {};
        this.links = {
            next: (_a = links.next) === null || _a === void 0 ? void 0 : _a.href,
            prev: (_b = links.prev) === null || _b === void 0 ? void 0 : _b.href,
            first: (_c = links.first) === null || _c === void 0 ? void 0 : _c.href
        };
    };
    ResourcePagination.prototype.parseData = function (response) {
        var _a = this.params, embedded = _a.embedded, factory = _a.factory;
        var data = (response === null || response === void 0 ? void 0 : response._embedded[embedded]) || [];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(function (attributes) {
            var item = factory.create(attributes);
            return item;
        });
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