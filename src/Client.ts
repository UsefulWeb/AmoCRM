import "reflect-metadata";
import { injectable } from "inversify";
import { container } from "./inversify.config";
import EventEmitter from "./EventEmitter";
import Connection from './Connection';
// import ResourceFactoryBuilder from './common/ResourceFactoryBuilder';
// import ConnectionRequest from './common/requests/ConnectionRequest';
import { ClientOptions } from "./interfaces/common";
import Environment from "./Environment";

class Client extends EventEmitter {
    protected readonly environment: Environment;
    protected readonly connection: Connection;
    // public readonly request: Request;

    constructor(options: ClientOptions) {
        const eventEmitterOptions = {
            captureRejections: options.captureRejections
        };
        super(eventEmitterOptions);
        this.environment = container.get(Environment);
        this.environment.set(options);
        // this.connection = new Connection(connectionOptions);
        // this.request = new ConnectionRequest(this.connection);
        // this.assignFactories();
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

export default Client;
