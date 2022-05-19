import qs from 'qs';
import https from 'https';
import http from 'http';
import * as Buffer from "buffer";

import { APIResponse, DomainRequestOptions } from "../interfaces/common";
import { StringValueObject } from "../types";
import {HttpMethod} from "../enums";
import EventEmitter from "./EventEmitter";
import JSONResponseParser from "./response/JSONResponseParser";


export default class DomainRequest extends EventEmitter {
    constructor(protected readonly config: DomainRequestOptions) {
        super();
    }
    protected isFormData(): boolean {
        const { data, options } = this.config;
        if (data instanceof FormData) {
            return true;
        }
        if (options?.useFormData) {
            return true;
        }
        return false;
    }
    protected getHeaders(): StringValueObject {
        const baseHeaders = this.config.options?.headers || {};
        const { token, method } = this.config;
        const clientHeaders: StringValueObject = {};
        if (token) {
            clientHeaders['Authorization'] = 'Bearer ' + token.access_token;
        }
        if (this.isFormData()) {
            clientHeaders['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        else if (method !== HttpMethod.GET) {
            clientHeaders['Content-Type'] = 'application/json';
        }
        return {
            ...baseHeaders,
            ...clientHeaders
        };
    }
    protected getMethod(): string {
        return this.config.method;
    }
    protected getData() {
        const { data, method } = this.config;
        if (method === HttpMethod.GET) {
            return;
        }
        if (this.isFormData()) {
            return qs.stringify(data);
        }
        return JSON.stringify(data);
    }
    protected getPath(): string {
        const { method, data, url } = this.config;
        const location = new URL(url);
        const path = location.pathname;
        const searchParams = Object.entries(location.searchParams);
        const queryStringData: StringValueObject = Object.fromEntries(searchParams);

        const mergedData = {
            ...data,
            ...queryStringData
        };
        if (method === HttpMethod.GET) {
            return path + '?' + qs.stringify(mergedData);
        }
        return url;
    }
    protected getHostname(): string {
        const { domain } = this.config;
        if (domain.includes('.')) {
            return domain;
        }
        return domain + '.amocrm.ru';
    }
    async process<T>(): Promise<APIResponse<T>> {
        const apiResponse = await this.makeRequest();
        return this.parseResponse<T>(apiResponse);
    }

    protected parseResponse<T>(apiResponse: APIResponse<string>): APIResponse<T> {
        const { parser = new JSONResponseParser } = this.config;
        return parser.parse(apiResponse);
    }

    protected makeRequest(): Promise<APIResponse<string>> {
        const path = this.getPath();
        const headers = this.getHeaders();
        const data = this.getData();
        const method = this.getMethod();
        const hostname = this.getHostname();
        const options = {
            hostname,
            path,
            method,
            headers
        };

        const onResponse = this.onResponse.bind(this);
        return new Promise<APIResponse<string>>((resolve, reject) => {
            const request = https.request(options, onResponse(resolve));
            if (method !== HttpMethod.GET) {
                request.write(data);
            }
            request.on('error', this.onError(reject));
            request.end();
        });
    }


    protected onResponse(callback: CallableFunction) {
        let buffer: Buffer[] = [];
        const onResponseData = (chunk: Buffer) => buffer.push(chunk);
        const onResponseEnd = (response: http.IncomingMessage) => {
            const data = buffer.join('');
            const result: APIResponse<string> = {
                response,
                data
            };
            return callback(result);
        };

        return (response: http.IncomingMessage) => {
            response.on('data', onResponseData);
            response.on('end', onResponseEnd(response));
        };
    }

    onError(callback: CallableFunction) {
        return (error: Error) => callback(error);
    }

}