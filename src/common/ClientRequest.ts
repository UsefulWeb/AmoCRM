import { injectable, inject } from "inversify";
import { RequestOptions } from "../interfaces/common";
import { RequestData } from "../types";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";

@injectable()
export default class ClientRequest extends EventEmitter {
    constructor(protected readonly connection: Connection) {
        super();
    }
    make(method: string, url: string, data?: RequestData, options?: RequestOptions) {
        return this.connection.makeRequest(method, url, data, options);
    }
    get(url: string, data?: RequestData, options?: RequestOptions) {
        return this.connection.makeRequest('GET', url, data, options);
    }
    post(url: string, data?: RequestData, options?: RequestOptions) {
        return this.connection.makeRequest('POST', url, data, options);
    }
}