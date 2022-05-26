import http from 'http';
import { StringValueObject, RequestData, JSONValue } from "../types";

export interface TokenOptions {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code?: string;
}

export interface AuthOptions extends TokenOptions {
    state?: string;
    server?: {
        port?: number;
    }
}

export interface ClientOptions {
    domain: string;
    auth: AuthOptions;
}

export interface TokenData {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    expires_at?: number
}

export interface RequestOptions {
    headers?: StringValueObject;
    useFormData?: boolean;
}

export interface DomainRequestOptions {
    domain: string,
    method: string;
    url: string;
    data?: RequestData;
    options?: RequestOptions;
    token?: TokenData;
    parser?: ResponseParser<string, any>
}

export interface APIResponse<T> {
    response: http.IncomingMessage,
    data: T
}

export interface AuthServerOptions {
    state?: string;
    port: number;
}

export interface AuthUrlParams {
    client_id: string;
    mode: string;
    state?: string;
}

export interface APIResponseErrorValue {
    hint: string;
    title: string;
    type: string;
    status: number;
    detail: string;
}

export interface ResponseParser<T, R> {
    parse(result: APIResponse<T>): APIResponse<R>;
}