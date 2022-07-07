import "reflect-metadata";
import { IClientOptions } from "./interfaces/common";
import EventEmitter from "./common/EventEmitter";
import { IConnection } from './common/Connection';
import { IEnvironment } from "./common/Environment";
import { IClientRequest } from "./common/ClientRequest";
import { IAuth } from "./common/Auth";
import { IToken } from "./common/Token";
import { ILeadFactory } from "./api/factories/LeadFactory";
import Lead from "./api/activeRecords/Lead";
import { IEntityConstructor, IResourceEntity, IResourceFactory } from "./interfaces/api";
/**
 * Основной класс библиотеки
 * */
export default class Client extends EventEmitter {
    readonly token: IToken;
    readonly environment: IEnvironment;
    readonly request: IClientRequest;
    readonly connection: IConnection;
    readonly auth: IAuth;
    readonly Lead: IEntityConstructor<Lead>;
    readonly leads: ILeadFactory;
    constructor(options: IClientOptions);
    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
    protected assignEntity<T extends IResourceEntity>(factory: IResourceFactory<T>): IEntityConstructor<T>;
}
