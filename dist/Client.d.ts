import "reflect-metadata";
import { ClientOptions } from "./interfaces/common";
import EventEmitter from "./common/EventEmitter";
import Connection from './common/Connection';
import Environment from "./common/Environment";
import ClientRequest from "./common/ClientRequest";
import Auth from "./common/Auth";
import Token from "./common/Token";
export default class Client extends EventEmitter {
    readonly token: Token;
    readonly environment: Environment;
    readonly request: ClientRequest;
    readonly connection: Connection;
    readonly auth: Auth;
    constructor(options: ClientOptions);
}
