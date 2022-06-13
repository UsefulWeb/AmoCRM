"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
/**
 * Функция обратной совместимости
 * */
function BackwardCompatibility(options) {
    console.warn('\x1b[33m%s\x1b[0m', 'ВНИМАНИЕ');
    console.warn('Используйте');
    console.warn('\x1b[32m%s\x1b[0m', 'const { Client } = require("amocrm-js")');
    console.warn('Вместо');
    console.warn('\x1b[31m%s\x1b[0m', 'const Client = require("amocrm-js")');
    console.warn('\x1b[33m%s\x1b[0m', 'В будущих версиях библиотеки старый способ будет удалён');
    return new Client_1.Client(options);
}
BackwardCompatibility.Client = Client_1.Client;
module.exports = BackwardCompatibility;
//# sourceMappingURL=index.js.map