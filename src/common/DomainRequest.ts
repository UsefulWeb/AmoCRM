import * as qs from 'qs';
import * as https from 'https';
import * as http from 'http';
import * as Buffer from "buffer";

import { IAPIResponse, DomainRequestOptions } from "../interfaces/common";
import { TStringValueObject } from "../types";
import {HttpMethod} from "../enums";
import EventEmitter from "./EventEmitter";
import JSONResponseParser from "./response/JSONResponseParser";

export default class DomainRequest extends EventEmitter {
    protected readonly hostname: string;

    constructor(protected readonly config: DomainRequestOptions) {
        super();
        this.hostname = this.getHostname();
    }
    protected isFormData(): boolean {
        const { options } = this.config;
        if (options?.useFormData) {
            return true;
        }
        return false;
    }
    protected getHeaders(): TStringValueObject {
        const baseHeaders = this.config.options?.headers || {};
        const { token, method } = this.config;
        const clientHeaders: TStringValueObject = {};
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
    protected getLocation() {
        const { url } = this.config;
        const re = /^https?:\/\//i;
        if (!re.test(url)) {
            const fullURL = `https://${this.hostname}${url}`;
            return new URL(fullURL);
        }
        return new URL(url);
    }
    protected getPath(): string {
        const { method, data, url } = this.config;

        if (method !== HttpMethod.GET) {
            return url;
        }
        const location = this.getLocation();
        const path = location.pathname;
        const queryStringData: TStringValueObject = Object.fromEntries(location.searchParams);

        const mergedData = {
            ...data,
            ...queryStringData
        };
        const queryString = qs.stringify(mergedData);

        if (!queryString) {
            return path;
        }
        return path + '?' + queryString;
    }
    protected getHostname(): string {
        const { domain } = this.config;
        if (domain.includes('.')) {
            return domain;
        }
        return domain + '.amocrm.ru';
    }
    async process<T>(): Promise<IAPIResponse<T>> {
        const apiResponse = await this.makeRequest();
        return this.parseResponse<T>(apiResponse);
    }

    protected parseResponse<T>(apiResponse: IAPIResponse<string>): IAPIResponse<T> {
        const { options = {}} = this.config;
        const { parser = new JSONResponseParser } = options;
        return parser.parse(apiResponse);
    }

    protected makeRequest(): Promise<IAPIResponse<string>> {
        const path = this.getPath();
        const headers = this.getHeaders();
        const data = this.getData();
        const method = this.getMethod();
        const hostname = this.hostname;;
        const options = {
            hostname,
            path,
            method,
            headers
        };
        const onResponse = this.onResponse.bind(this);
        return new Promise<IAPIResponse<string>>((resolve, reject) => {
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
        const onResponseEnd = (response: http.IncomingMessage) => () => {
            const data = buffer.join('');
            const result: IAPIResponse<string> = {
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