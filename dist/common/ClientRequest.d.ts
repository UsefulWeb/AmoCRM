import { IRequestOptions } from "../interfaces/common";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";
export default class ClientRequest extends EventEmitter {
    protected readonly connection: Connection;
    constructor(connection: Connection);
    make(method: string, url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<any>>;
    get(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<any>>;
    post(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<any>>;
    patch(url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<any>>;
}
