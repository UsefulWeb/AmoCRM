import * as http from 'http';
import { IAPIResponse, DomainRequestOptions } from "../interfaces/common";
import { TStringValueObject } from "../types";
import EventEmitter from "./EventEmitter";
/**
 * Класс запросов к порталу AmoCRM
 * */
export default class DomainRequest<T> extends EventEmitter {
    protected readonly config: DomainRequestOptions<T>;
    protected readonly hostname: string;
    constructor(config: DomainRequestOptions<T>);
    protected isFormData(): boolean;
    protected getHeaders(): TStringValueObject;
    protected getMethod(): string;
    protected getData(): string | undefined;
    protected getLocation(): URL;
    protected getPath(): string;
    protected getHostname(): string;
    process(): Promise<IAPIResponse<T>>;
    protected parseResponse(apiResponse: IAPIResponse<string>): IAPIResponse<T>;
    protected makeRequest(): Promise<IAPIResponse<string>>;
    protected onResponse(callback: CallableFunction): (response: http.IncomingMessage) => void;
    onError(callback: CallableFunction): (error: Error) => any;
}
