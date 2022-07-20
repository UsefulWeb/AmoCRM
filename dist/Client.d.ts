import "reflect-metadata";
import { IClientOptions } from "./interfaces/common";
import { EventEmitter } from "./common/EventEmitter";
import { IConnection } from './common/Connection';
import { IEnvironment } from "./common/Environment";
import { IClientRequest } from "./common/ClientRequest";
import { IAuth } from "./common/Auth";
import { IToken } from "./common/Token";
import { ILeadFactory } from "./api/factories/LeadFactory";
import { ILead } from "./api/activeRecords/Lead";
import { JSONObject } from "./types";
import { IResourceEntity, IResourceFactory } from "./interfaces/api";
import { IContact } from "./api/activeRecords/Contact";
import { IContactFactory } from "./api/factories/ContactFactory";
import { ICompanyFactory } from "./api/factories/CompanyFactory";
import { ICompany } from "./api/activeRecords/Company";
export declare type IClientEntity<T> = (attributes?: JSONObject) => T;
/**
 * Основной класс библиотеки
 * */
export default class Client extends EventEmitter {
    readonly token: IToken;
    readonly environment: IEnvironment;
    readonly request: IClientRequest;
    readonly connection: IConnection;
    readonly auth: IAuth;
    readonly Lead: IClientEntity<ILead>;
    readonly Contact: IClientEntity<IContact>;
    readonly Company: IClientEntity<ICompany>;
    readonly leads: ILeadFactory;
    readonly contacts: IContactFactory;
    readonly companies: ICompanyFactory;
    constructor(options: IClientOptions);
    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
    protected assignEntity<T extends IResourceEntity<IResourceFactory<T>>>(factory: IResourceFactory<T>): IClientEntity<T>;
}
