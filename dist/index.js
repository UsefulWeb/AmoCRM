"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const Client_1 = tslib_1.__importDefault(require("./Client"));
exports.Client = Client_1.default;
/**
 * Функция обратной совместимости
 * */
const BackwardCompatibility = function BackwardCompatibility(options) {
    console.warn('\x1b[33m%s\x1b[0m', 'ВНИМАНИЕ');
    console.warn('Используйте');
    console.warn('\x1b[32m%s\x1b[0m', 'const { Client } = require("amocrm-js")');
    console.warn('Вместо');
    console.warn('\x1b[31m%s\x1b[0m', 'const Client = require("amocrm-js")');
    console.warn('\x1b[33m%s\x1b[0m', 'В будущих версиях библиотеки старый способ будет удалён');
    return new Client_1.default(options);
};
BackwardCompatibility.Client = Client_1.default;
exports.default = BackwardCompatibility;
//# sourceMappingURL=index.js.map