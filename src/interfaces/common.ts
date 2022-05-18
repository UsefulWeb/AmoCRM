import http from 'http';
import { StringValueObject, RequestData } from "../types";

export interface TokenOptions {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code?: string;
}

export interface AuthOptions extends TokenOptions {
    server?: {
        state?: string;
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
}

export interface APIResponse {
    response: http.IncomingMessage,
    data: any
}

export interface JSONResponse {
    response: http.IncomingMessage,
    data: JSONValue
}

export interface AuthServerOptions {
    code: string;
    state?: string;
    port: number;
}

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;