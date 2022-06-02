/// <reference types="node" />
import * as http from "http";
import EventEmitter from "./EventEmitter";
import { IAuthServerOptions } from "../interfaces/common";
export default class AuthServer extends EventEmitter {
    protected readonly options: IAuthServerOptions;
    protected instance?: http.Server;
    constructor(options: IAuthServerOptions);
    run(): void;
    onListenStart(): void;
    stop(): Promise<void>;
    handle(request: http.IncomingMessage, response: http.ServerResponse): void;
}
