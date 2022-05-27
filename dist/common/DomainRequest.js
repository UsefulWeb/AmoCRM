"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qs = tslib_1.__importStar(require("qs"));
var https = tslib_1.__importStar(require("https"));
var enums_1 = require("../enums");
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var JSONResponseParser_1 = tslib_1.__importDefault(require("./response/JSONResponseParser"));
var DomainRequest = /** @class */ (function (_super) {
    tslib_1.__extends(DomainRequest, _super);
    function DomainRequest(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.hostname = _this.getHostname();
        return _this;
    }
    DomainRequest.prototype.isFormData = function () {
        var options = this.config.options;
        if (options === null || options === void 0 ? void 0 : options.useFormData) {
            return true;
        }
        return false;
    };
    DomainRequest.prototype.getHeaders = function () {
        var _a;
        var baseHeaders = ((_a = this.config.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
        var _b = this.config, token = _b.token, method = _b.method;
        var clientHeaders = {};
        if (token) {
            clientHeaders['Authorization'] = 'Bearer ' + token.access_token;
        }
        if (this.isFormData()) {
            clientHeaders['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        else if (method !== enums_1.HttpMethod.GET) {
            clientHeaders['Content-Type'] = 'application/json';
        }
        return tslib_1.__assign(tslib_1.__assign({}, baseHeaders), clientHeaders);
    };
    DomainRequest.prototype.getMethod = function () {
        return this.config.method;
    };
    DomainRequest.prototype.getData = function () {
        var _a = this.config, data = _a.data, method = _a.method;
        if (method === enums_1.HttpMethod.GET) {
            return;
        }
        if (this.isFormData()) {
            return qs.stringify(data);
        }
        return JSON.stringify(data);
    };
    DomainRequest.prototype.getLocation = function () {
        var url = this.config.url;
        var re = /^https?:\/\//i;
        if (!re.test(url)) {
            var fullURL = "https://".concat(this.hostname).concat(url);
            return new URL(fullURL);
        }
        return new URL(url);
    };
    DomainRequest.prototype.getPath = function () {
        var _a = this.config, method = _a.method, data = _a.data, url = _a.url;
        var location = this.getLocation();
        var path = location.pathname;
        var queryStringData = Object.fromEntries(location.searchParams);
        var mergedData = tslib_1.__assign(tslib_1.__assign({}, data), queryStringData);
        if (method === enums_1.HttpMethod.GET) {
            return path + '?' + qs.stringify(mergedData);
        }
        return url;
    };
    DomainRequest.prototype.getHostname = function () {
        var domain = this.config.domain;
        if (domain.includes('.')) {
            return domain;
        }
        return domain + '.amocrm.ru';
    };
    DomainRequest.prototype.process = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var apiResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest()];
                    case 1:
                        apiResponse = _a.sent();
                        return [2 /*return*/, this.parseResponse(apiResponse)];
                }
            });
        });
    };
    DomainRequest.prototype.parseResponse = function (apiResponse) {
        var _a = this.config.parser, parser = _a === void 0 ? new JSONResponseParser_1.default : _a;
        return parser.parse(apiResponse);
    };
    DomainRequest.prototype.makeRequest = function () {
        var _this = this;
        var path = this.getPath();
        var headers = this.getHeaders();
        var data = this.getData();
        var method = this.getMethod();
        var hostname = this.hostname;
        ;
        var options = {
            hostname: hostname,
            path: path,
            method: method,
            headers: headers
        };
        var onResponse = this.onResponse.bind(this);
        return new Promise(function (resolve, reject) {
            var request = https.request(options, onResponse(resolve));
            if (method !== enums_1.HttpMethod.GET) {
                request.write(data);
            }
            request.on('error', _this.onError(reject));
            request.end();
        });
    };
    DomainRequest.prototype.onResponse = function (callback) {
        var buffer = [];
        var onResponseData = function (chunk) { return buffer.push(chunk); };
        var onResponseEnd = function (response) { return function () {
            var data = buffer.join('');
            var result = {
                response: response,
                data: data
            };
            return callback(result);
        }; };
        return function (response) {
            response.on('data', onResponseData);
            response.on('end', onResponseEnd(response));
        };
    };
    DomainRequest.prototype.onError = function (callback) {
        return function (error) { return callback(error); };
    };
    return DomainRequest;
}(EventEmitter_1.default));
exports.default = DomainRequest;
