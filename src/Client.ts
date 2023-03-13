import "reflect-metadata";
import { IClientOptions } from "./interfaces/common";
import { EventEmitter } from "./common/EventEmitter";
import { Connection, IConnection } from './common/Connection';
import { Environment, IEnvironment } from "./common/Environment";
import { ClientRequest, IClientRequest } from "./common/ClientRequest";
import { Auth, IAuth } from "./common/Auth";
import { Token, IToken } from "./common/Token";
import { LeadFactory, ILeadFactory } from "./api/factories/LeadFactory";
import { ILead } from "./api/activeRecords/Lead";
import { JSONObject } from "./types";
import { IResourceEntity, IResourceFactory } from "./interfaces/api";
import { IContact } from "./api/activeRecords/Contact";
import { ContactFactory, IContactFactory } from "./api/factories/ContactFactory";
import CompanyFactory, { ICompanyFactory } from "./api/factories/CompanyFactory";
import { ICompany } from "./api/activeRecords/Company";

export type IClientEntity<T> = (attributes?: JSONObject) => T;

/**
 * Основной класс библиотеки
 * */
export class Client extends EventEmitter {
    public readonly token: IToken;
    public readonly environment: IEnvironment;
    public readonly request: IClientRequest;
    public readonly connection: IConnection;
    public readonly auth: IAuth;

    public readonly Lead: IClientEntity<ILead>;
    public readonly Contact: IClientEntity<IContact>;
    public readonly Company: IClientEntity<ICompany>;

    public readonly leads: ILeadFactory;
    public readonly contacts: IContactFactory;
    public readonly companies: ICompanyFactory;

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

        this.contacts = new ContactFactory(this.request);
        this.Contact = this.assignEntity(this.contacts);

        this.companies = new CompanyFactory(this.request);
        this.Company = this.assignEntity(this.companies);
    }

    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
    protected assignEntity<T extends IResourceEntity<IResourceFactory<T>>>(factory: IResourceFactory<T>): IClientEntity<T> {
        return function (attributes?:JSONObject) {
            return factory.from(attributes);
        };
    }
}
