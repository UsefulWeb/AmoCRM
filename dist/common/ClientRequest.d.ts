import { IAPIResponse, IRequestOptions } from "../interfaces/common";
import { IConnection } from "./Connection";
import { EventEmitter } from "./EventEmitter";
export interface IClientRequest {
    make<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    get<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    post<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    patch<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
}
/**
 * Компонент запросов к серверу.
 * Доступен как client.request
 * */
export declare class ClientRequest extends EventEmitter implements IClientRequest {
    protected readonly connection: IConnection;
    constructor(connection: IConnection);
    make<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    get<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    post<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
    patch<T>(url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
}
