/// <reference types="node" />
import * as http from "http";
import EventEmitter from "./EventEmitter";
import { AuthServerOptions } from "../interfaces/common";
export default class AuthServer extends EventEmitter {
    protected readonly options: AuthServerOptions;
    protected instance?: http.Server;
    constructor(options: AuthServerOptions);
    run(): void;
    onListenStart(): void;
    stop(): Promise<void>;
    handle(request: http.IncomingMessage, response: http.ServerResponse): void;
}
