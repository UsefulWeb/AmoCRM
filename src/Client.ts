import "reflect-metadata";
import { ClientOptions } from "./interfaces/common";
import EventEmitter from "./common/EventEmitter";
import Connection from './common/Connection';
import Environment from "./common/Environment";
import ClientRequest from "./common/ClientRequest";
import Auth from "./common/Auth";
import Token from "./common/Token";

export default class Client extends EventEmitter {
    public readonly token: Token;
    public readonly environment: Environment;
    public readonly request: ClientRequest;
    public readonly connection: Connection;
    public readonly auth: Auth;

    constructor(options: ClientOptions) {
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
    }
}

module.exports = Client;