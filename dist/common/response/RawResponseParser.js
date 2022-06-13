"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EventEmitter_1 = tslib_1.__importDefault(require("../EventEmitter"));
/**
 * Передаёт ответ сервера без преобразования
 * */
class RawResponseParser extends EventEmitter_1.default {
    parse(apiResponse) {
        return apiResponse;
    }
}
exports.default = RawResponseParser;
//# sourceMappingURL=RawResponseParser.js.map