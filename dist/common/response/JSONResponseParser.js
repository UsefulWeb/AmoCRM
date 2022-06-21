"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EventEmitter_1 = tslib_1.__importDefault(require("../EventEmitter"));
const APIResponseError_1 = tslib_1.__importDefault(require("../APIResponseError"));
/**
 * Преобразует ответ портала в JSON-объект
 * */
class JSONResponseParser extends EventEmitter_1.default {
    parse(apiResponse) {
        const { response } = apiResponse;
        if (!apiResponse.data) {
            const data = {};
            return {
                response,
                data
            };
        }
        const data = JSON.parse(apiResponse.data);
        this.checkErrors(data, response);
        return {
            response,
            data
        };
    }
    checkErrors(data, response) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            console.error(data);
            throw new APIResponseError_1.default('API_RESPONSE_ERROR', data, response);
        }
    }
}
exports.default = JSONResponseParser;
//# sourceMappingURL=JSONResponseParser.js.map