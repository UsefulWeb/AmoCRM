"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const EventEmitter_1 = tslib_1.__importDefault(require("./common/EventEmitter"));
const Connection_1 = tslib_1.__importDefault(require("./common/Connection"));
const Environment_1 = tslib_1.__importDefault(require("./common/Environment"));
const ClientRequest_1 = tslib_1.__importDefault(require("./common/ClientRequest"));
const Auth_1 = tslib_1.__importDefault(require("./common/Auth"));
const Token_1 = tslib_1.__importDefault(require("./common/Token"));
const LeadFactory_1 = tslib_1.__importDefault(require("./api/factories/LeadFactory"));
/**
 * Основной класс библиотеки
 * */
class Client extends EventEmitter_1.default {
    constructor(options) {
        super();
        if (!options) {
            throw new Error('NO_OPTIONS');
        }
        this.environment = new Environment_1.default(options);
        this.token = new Token_1.default(this.environment);
        this.auth = new Auth_1.default(this.environment, this.token);
        this.connection = new Connection_1.default(this.environment, this.token, this.auth);
        this.request = new ClientRequest_1.default(this.connection);
        this.leads = new LeadFactory_1.default(this.request);
        this.Lead = this.assignEntity(this.leads);
    }
    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
    assignEntity(factory) {
        return function (attributes) {
            return factory.from(attributes);
        };
    }
}
exports.default = Client;
module.exports = Client;
//# sourceMappingURL=Client.js.map