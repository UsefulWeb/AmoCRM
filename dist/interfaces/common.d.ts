/// <reference types="node" />
import * as http from 'http';
import { TStringValueObject } from "../types";
export interface ITokenOptions {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code?: string;
}
export interface IAuthOptions extends ITokenOptions {
    state?: string;
    server?: {
        port?: number;
    };
}
export interface IClientOptions {
    [index: string]: string | object;
    domain: string;
    auth: IAuthOptions;
}
export interface ITokenData {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    expires_at?: number;
}
export interface IRequestOptions {
    headers?: TStringValueObject;
    useFormData?: boolean;
    parser?: IResponseParser<string>;
}
export interface IDomainRequestOptions {
    domain: string;
    method: string;
    url: string;
    data?: object;
    options?: IRequestOptions;
    token?: ITokenData;
}
export interface IAPIResponse<T> {
    response: http.IncomingMessage;
    data: T;
}
export interface IAuthServerOptions {
    state?: string;
    port: number;
}
export interface IAuthUrlParams {
    client_id: string;
    mode: string;
    state?: string;
}
export interface IAPIResponseErrorValue {
    hint: string;
    title: string;
    type: string;
    status: number;
    detail: string;
}
export interface IResponseParser<T> {
    parse<R>(result: IAPIResponse<T>): IAPIResponse<R>;
}
