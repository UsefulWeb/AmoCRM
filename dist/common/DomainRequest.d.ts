import * as http from 'http';
import { APIResponse, DomainRequestOptions } from "../interfaces/common";
import { StringValueObject } from "../types";
import EventEmitter from "./EventEmitter";
export default class DomainRequest extends EventEmitter {
    protected readonly config: DomainRequestOptions;
    protected readonly hostname: string;
    constructor(config: DomainRequestOptions);
    protected isFormData(): boolean;
    protected getHeaders(): StringValueObject;
    protected getMethod(): string;
    protected getData(): string | undefined;
    protected getLocation(): URL;
    protected getPath(): string;
    protected getHostname(): string;
    process<T>(): Promise<APIResponse<T>>;
    protected parseResponse<T>(apiResponse: APIResponse<string>): APIResponse<T>;
    protected makeRequest(): Promise<APIResponse<string>>;
    protected onResponse(callback: CallableFunction): (response: http.IncomingMessage) => void;
    onError(callback: CallableFunction): (error: Error) => any;
}
