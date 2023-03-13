import "reflect-metadata";
import { IClientOptions } from "./interfaces/common";
import { EventEmitter } from "./common/EventEmitter";
import { Connection, IConnection } from './common/Connection';
import { Environment, IEnvironment } from "./common/Environment";
import { ClientRequest, IClientRequest } from "./common/ClientRequest";
import { Auth, IAuth } from "./common/Auth";
import { Token, IToken } from "./common/Token";
import { ILeadFactory } from "./api/factories/LeadFactory";
import { ILead } from "./api/activeRecords/Lead";
import { JSONObject } from "./types";
import { IClientConstructors, IResourceEntity, IResourceFactory } from "./interfaces/api";
import { IContact } from "./api/activeRecords/Contact";
import { IContactFactory } from "./api/factories/ContactFactory";
import { ICompanyFactory } from "./api/factories/CompanyFactory";
import { ICompany } from "./api/activeRecords/Company";
import { IFactoryConstructors } from "./api/factories";
import { ConstructorBuilder } from "./common/ConstructorBuilder";
import { IEntityConstructors } from "./api/activeRecords";

export type IClientEntity<T> = (attributes?: JSONObject) => T;


export interface IClient {
    getRequest(): IClientRequest;
    getFactoryConstructors(): IFactoryConstructors;
    getEntityConstructors(): IEntityConstructors;
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

    protected _constructors: IClientConstructors;

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

        const constructors = ConstructorBuilder.applyPlugins(options.plugins);
        const { factories } = constructors;
        this._constructors = constructors;

        this.leads = new factories.leads(this);
        this.Lead = this.assignEntity(this.leads);

        this.contacts = new factories.contacts(this);
        this.Contact = this.assignEntity(this.contacts);

        this.companies = new factories.companies(this);
        this.Company = this.assignEntity(this.companies);

    }

    getRequest() {
        return this.request;
    }

    getFactoryConstructors() {
        return this._constructors.factories;
    }

    getEntityConstructors() {
        return this._constructors.entities;
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
