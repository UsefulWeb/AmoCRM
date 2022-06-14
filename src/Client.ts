import "reflect-metadata";
import { IClientOptions } from "./interfaces/common";
import EventEmitter from "./common/EventEmitter";
import Connection from './common/Connection';
import Environment from "./common/Environment";
import ClientRequest from "./common/ClientRequest";
import Auth from "./common/Auth";
import Token from "./common/Token";

import LeadFactory from "./api/factories/LeadFactory";
import Lead from "./api/activeRecords/Lead";
import { JSONObject } from "./types";
import { IEntityConstructor, IResourceFactory } from "./interfaces/api";

/**
 * Основной класс библиотеки
 * */
export default class Client extends EventEmitter {
    public readonly token: Token;
    public readonly environment: Environment;
    public readonly request: ClientRequest;
    public readonly connection: Connection;
    public readonly auth: Auth;

    public readonly Lead: IEntityConstructor<Lead>;

    public readonly leads: LeadFactory;

    constructor(options: IClientOptions) {
        super();
        if (!options) {
            throw new Error('NO_OPTIONS');
        }
        this.environment = new Environment(options);
        this.token = new Token(this.environment);
        this.auth = new Auth(this.environment, this.token);
        this.connection = new Connection(
            this.environment,
            this.token,
            this.auth
        );
        this.request = new ClientRequest(this.connection);

        this.leads = new LeadFactory(this.request);
        this.Lead = this.assignEntity(this.leads);
    }

    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
    protected assignEntity<T>(factory: IResourceFactory<T>): IEntityConstructor<T> {
        return function (attributes?:JSONObject) {
            return factory.from(attributes);
        };
    }
}
