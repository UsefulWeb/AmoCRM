import { RequestOptions } from "../interfaces/common";
import { RequestData } from "../types";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";

export default class ClientRequest extends EventEmitter {
    protected readonly connection: Connection;
    constructor(connection: Connection) {
        super();
        this.connection = connection;
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
    patch(url: string, data?: RequestData, options?: RequestOptions) {
        return this.connection.makeRequest('PATCH', url, data, options);
    }
}