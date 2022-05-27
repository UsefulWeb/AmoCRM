"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter_1 = tslib_1.__importDefault(require("../EventEmitter"));
var APIResponseError_1 = tslib_1.__importDefault(require("../APIResponseError"));
var JSONResponseParser = /** @class */ (function (_super) {
    tslib_1.__extends(JSONResponseParser, _super);
    function JSONResponseParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONResponseParser.prototype.parse = function (apiResponse) {
        var response = apiResponse.response;
        var data = JSON.parse(apiResponse.data);
        this.checkErrors(data);
        return {
            response: response,
            data: data
        };
    };
    JSONResponseParser.prototype.checkErrors = function (data) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            throw new APIResponseError_1.default('API_RESPONSE_ERROR', data);
        }
    };
    return JSONResponseParser;
}(EventEmitter_1.default));
exports.default = JSONResponseParser;
