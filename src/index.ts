import Client from './Client';
import { IClientOptions } from "./interfaces/common";

/**
 * Функция обратной совместимости
 * */
function BackwardCompatibility(options: IClientOptions) {
    console.warn('\x1b[33m%s\x1b[0m', 'ВНИМАНИЕ');
    console.warn('Используйте');
    console.warn('\x1b[32m%s\x1b[0m', 'const { Client } = require("amocrm-js")');
    console.warn('Вместо')
    console.warn('\x1b[31m%s\x1b[0m', 'const Client = require("amocrm-js")');
    console.warn('\x1b[33m%s\x1b[0m', 'В будущих версиях библиотеки старый способ будет удалён');
    return new Client(options);
}

BackwardCompatibility.Client = Client;

export { Client };
export default BackwardCompatibility;
module.exports = BackwardCompatibility;