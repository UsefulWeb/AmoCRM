"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var ClientRequest = /** @class */ (function (_super) {
    tslib_1.__extends(ClientRequest, _super);
    function ClientRequest(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        return _this;
    }
    ClientRequest.prototype.make = function (method, url, data, options) {
        return this.connection.makeRequest(method, url, data, options);
    };
    ClientRequest.prototype.get = function (url, data, options) {
        return this.connection.makeRequest('GET', url, data, options);
    };
    ClientRequest.prototype.post = function (url, data, options) {
        return this.connection.makeRequest('POST', url, data, options);
    };
    ClientRequest.prototype.patch = function (url, data, options) {
        return this.connection.makeRequest('PATCH', url, data, options);
    };
    return ClientRequest;
}(EventEmitter_1.default));
exports.default = ClientRequest;
