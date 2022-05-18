import "reflect-metadata";
import { injectable } from "inversify";
import { container } from "./inversify.config";
import EventEmitter from "./common/EventEmitter";
import Connection from './common/Connection';
// import ResourceFactoryBuilder from './common/ResourceFactoryBuilder';
import ConnectionRequest from './common/ClientRequest';
import { ClientOptions } from "./interfaces/common";
import Environment from "./common/Environment";
import ClientRequest from "./common/ClientRequest";
import Token from "./common/Token";

export default class Client extends EventEmitter {
    protected readonly environment: Environment;
    protected readonly request: ClientRequest;

    constructor(options: ClientOptions) {
        super();
        this.environment = container.get(Environment);
        this.environment.set(options);

        this.request = container.get(ClientRequest);
        this.subscribeEvents();
        // this.assignFactories();
    }

    subscribeEvents() {
        const token = container.get(Token);
        const auth = container.get(Connection);
        token.subscribe(this);
        auth.subscribe(this);
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
