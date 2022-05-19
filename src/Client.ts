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
    protected readonly request: ClientRequest;

    constructor(options: ClientOptions) {
        super();
        this.environment = container.get(IoC.Environment);
        this.request = container.get(IoC.ClientRequest);
        this.environment.set(options);
        this.subscribeEvents();
        // this.assignFactories();
    }

    subscribeEvents() {
        const token: Token = container.get(IoC.Token);
        const connection: Connection = container.get(IoC.Connection);
        token.subscribe(this);
        connection.subscribe(this);
    }

    // assignFactories() {
    //     const builder = new ResourceFactoryBuilder(this.connection),
    //         factories = builder.getResourceFactories();
    //     Object.assign(this, factories);
    // }
    //
    // connect() {
    //     return this.connection.connect();
    // }
    //
    // disconnect() {
    //     return this.connection.disconnect();
    // }
}
