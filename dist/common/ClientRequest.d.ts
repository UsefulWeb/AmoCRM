import { IRequestOptions } from "../interfaces/common";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";
/**
 * Компонент запросов к серверу.
 * Доступен как client.request
 * */
export default class ClientRequest extends EventEmitter {
    protected readonly connection: Connection;
    constructor(connection: Connection);
    make<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<T>>;
    get<T>(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<T>>;
    post<T>(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<T>>;
    patch<T>(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<T>>;
}
