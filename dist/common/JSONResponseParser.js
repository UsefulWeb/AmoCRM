"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EventEmitter_1 = require("./EventEmitter");
const APIResponseError_1 = tslib_1.__importDefault(require("./APIResponseError"));
/**
 * Преобразует ответ портала в JSON-объект
 * */
class JSONResponseParser extends EventEmitter_1.EventEmitter {
    parse(apiResponse) {
        const { response } = apiResponse;
        if (!apiResponse.data) {
            const data = {};
            return {
                response,
                data
            };
        }
        let data;
        try {
            data = JSON.parse(apiResponse.data);
        }
        catch (e) {
            throw new APIResponseError_1.default('JSON_PARSE_ERROR', null, apiResponse);
        }
        this.checkErrors(data, apiResponse);
        return {
            response,
            data
        };
    }
    checkErrors(data, apiResponse) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            console.error(data);
            throw new APIResponseError_1.default('API_RESPONSE_ERROR', data, apiResponse);
        }
    }
}
exports.default = JSONResponseParser;
//# sourceMappingURL=JSONResponseParser.js.map