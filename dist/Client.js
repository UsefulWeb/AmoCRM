"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const EventEmitter_1 = require("./common/EventEmitter");
const Connection_1 = require("./common/Connection");
const Environment_1 = require("./common/Environment");
const ClientRequest_1 = require("./common/ClientRequest");
const Auth_1 = require("./common/Auth");
const Token_1 = require("./common/Token");
const LeadFactory_1 = require("./api/factories/LeadFactory");
const ContactFactory_1 = require("./api/factories/ContactFactory");
const CompanyFactory_1 = tslib_1.__importDefault(require("./api/factories/CompanyFactory"));
/**
 * Основной класс библиотеки
 * */
class Client extends EventEmitter_1.EventEmitter {
    constructor(options) {
        super();
        if (!options) {
            throw new Error('NO_OPTIONS');
        }
        this.environment = new Environment_1.Environment(options);
        this.token = new Token_1.Token(this.environment);
        this.auth = new Auth_1.Auth(this.environment, this.token);
        this.connection = new Connection_1.Connection(this.environment, this.token, this.auth);
        this.request = new ClientRequest_1.ClientRequest(this.connection);
        this.leads = new LeadFactory_1.LeadFactory(this.request);
        this.Lead = this.assignEntity(this.leads);
        this.contacts = new ContactFactory_1.ContactFactory(this.request);
        this.Contact = this.assignEntity(this.contacts);
        this.companies = new CompanyFactory_1.default(this.request);
        this.Company = this.assignEntity(this.companies);
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
//# sourceMappingURL=Client.js.map