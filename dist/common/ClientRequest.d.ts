import { RequestOptions } from "../interfaces/common";
import { RequestData } from "../types";
import Connection from "./Connection";
import EventEmitter from "./EventEmitter";
export default class ClientRequest extends EventEmitter {
    protected readonly connection: Connection;
    constructor(connection: Connection);
    make(method: string, url: string, data?: RequestData, options?: RequestOptions): Promise<import("../interfaces/common").APIResponse<import("../types").JSONValue>>;
    get(url: string, data?: RequestData, options?: RequestOptions): Promise<import("../interfaces/common").APIResponse<import("../types").JSONValue>>;
    post(url: string, data?: RequestData, options?: RequestOptions): Promise<import("../interfaces/common").APIResponse<import("../types").JSONValue>>;
    patch(url: string, data?: RequestData, options?: RequestOptions): Promise<import("../interfaces/common").APIResponse<import("../types").JSONValue>>;
}
