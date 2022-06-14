import { IRequestOptions } from "../interfaces/common";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";

/**
 * Компонент запросов к серверу.
 * Доступен как client.request
 * */
export default class ClientRequest extends EventEmitter {
    protected readonly connection: Connection;
    constructor(connection: Connection) {
        super();
        this.connection = connection;
    }
    make<T>(method: string, url: string, data?: object, options?: IRequestOptions) {
        return this.connection.makeRequest<T>(method, url, data, options);
    }
    get<T>(url: string, data?: object, options?: IRequestOptions) {
        return this.connection.makeRequest<T>('GET', url, data, options);
    }
    post<T>(url: string, data?: object, options?: IRequestOptions) {
        return this.connection.makeRequest<T>('POST', url, data, options);
    }
    patch<T>(url: string, data?: object, options?: IRequestOptions) {
        return this.connection.makeRequest<T>('PATCH', url, data, options);
    }
}