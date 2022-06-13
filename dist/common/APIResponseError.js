"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Класс ошибки API портала
 * */
class APIResponseError extends Error {
    constructor(message, apiResponse, response) {
        super(message);
        this.apiResponse = apiResponse;
        this.response = response;
    }
}
exports.default = APIResponseError;
//# sourceMappingURL=APIResponseError.js.map