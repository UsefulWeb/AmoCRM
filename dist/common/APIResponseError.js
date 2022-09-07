"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Класс ошибки API портала
 * */
class APIResponseError extends Error {
    constructor(message, data, response) {
        super(message);
        this.data = data;
        this.response = response;
    }
}
exports.default = APIResponseError;
//# sourceMappingURL=APIResponseError.js.map