"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Класс ошибки API портала
 * */
class APIResponseError extends Error {
    constructor(message, data, apiResponse) {
        super(message);
        this.data = data;
        this.apiResponse = apiResponse;
    }
}
exports.default = APIResponseError;
//# sourceMappingURL=APIResponseError.js.map