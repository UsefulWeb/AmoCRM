import "reflect-metadata";
import {IClientOptions} from "./interfaces/common";
import {EventEmitter} from "./common/EventEmitter";
import {Connection, IConnection} from './common/Connection';
import {Environment, IEnvironment} from "./common/Environment";
import {ClientRequest, IClientRequest} from "./common/ClientRequest";
import {Auth, IAuth} from "./common/Auth";
import {IToken, Token} from "./common/Token";
import {ILeadFactory} from "./api/factories/LeadFactory";
import {ILead} from "./api/activeRecords/Lead";
import {JSONObject} from "./types";
import {IClientConstructors, IEntityAttributes, IResourceEntity, IResourceFactory} from "./interfaces/api";
import {IContact} from "./api/activeRecords/Contact";
import {IContactFactory} from "./api/factories/ContactFactory";
import {ICompanyFactory} from "./api/factories/CompanyFactory";
import {ICompany} from "./api/activeRecords/Company";
import {IFactoryConstructors} from "./api/factories";
import defaultConstructors from "./common/constructors";
import {IEntityConstructors} from "./api/activeRecords";

export type IClientEntity<T> = {
    new (attributes?: JSONObject): T;
};

export interface IClient {
    constructors: IClientConstructors;
    getRequest(): IClientRequest;
    getFactoryConstructors(): IFactoryConstructors;
    getEntityConstructors(): IEntityConstructors;

    assignEntity<T extends IResourceEntity<IResourceFactory<T>>>(factory: IResourceFactory<T>): IClientEntity<T>;

    readonly token: IToken;
    readonly environment: IEnvironment;
    readonly request: IClientRequest;
    readonly connection: IConnection;
    readonly auth: IAuth;

    Lead: IClientEntity<ILead>;
    Contact: IClientEntity<IContact>;
    Company: IClientEntity<ICompany>;

    leads: ILeadFactory;
    contacts: IContactFactory;
    companies: ICompanyFactory;
}
/**
 * Основной класс библиотеки
 * */
export class Client extends EventEmitter implements IClient {
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
        const { factories } = this.constructors;
        this.leads = new factories.leads(this);
        this.contacts = new factories.contacts(this);
        this.companies = new factories.companies(this);

        this.Lead = this.assignEntity(this.leads);
        this.Contact = this.assignEntity(this.contacts);
        this.Company = this.assignEntity(this.companies);
    }
    get constructors() {
        return defaultConstructors;
    }

    getRequest() {
        return this.request;
    }

    getFactoryConstructors() {
        return this.constructors.factories;
    }

    getEntityConstructors() {
        return this.constructors.entities;
    }

    /**
     * Привязывает конструктор сущностей
     * @param factory - фабрика сущностей
     * @returns функция конструктор для вызова new client[Entity]
     * */
     assignEntity<T extends IResourceEntity<IResourceFactory<T>>>(factory: IResourceFactory<T>): IClientEntity<T> {
        return function (attributes?: IEntityAttributes): T {
            return factory.from(attributes);
        } as never as IClientEntity<T>;
    }
}
