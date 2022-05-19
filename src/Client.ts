import "reflect-metadata";
import { inject } from "inversify";
import { container } from "./inversify.config";
import EventEmitter from "./common/EventEmitter";
import Connection from './common/Connection';
// import ResourceFactoryBuilder from './common/ResourceFactoryBuilder';
import { ClientOptions } from "./interfaces/common";
import Environment from "./common/Environment";
import ClientRequest from "./common/ClientRequest";
import Token from "./common/Token";
import { IoC } from "./types";

export default class Client extends EventEmitter {
    protected readonly environment: Environment;
    protected readonly token: Token;
    public readonly request: ClientRequest;
    public readonly connection: Connection;

    constructor(options: ClientOptions) {
        super();
        this.environment = container.get(IoC.Environment);
        this.token = container.get(IoC.Token);
        this.connection = container.get(IoC.Connection);
        this.request = container.get(IoC.ClientRequest);
        this.environment.set(options);

        this.subscribeToComponents();
    }

    subscribeToComponents() {
        this.token.subscribe(this);
        this.connection.subscribe(this);
    }
}
