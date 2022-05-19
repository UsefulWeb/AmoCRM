import { inject, injectable } from "inversify";
import EventEmitter from "./EventEmitter";
import { APIResponse, AuthOptions, TokenData } from "../interfaces/common";
import schema from "../schema/v4";
import Environment from "./Environment";
import { IoC, JSONValue, StringValueObject } from "../types";
import DomainRequest from "./DomainRequest";
import * as domain from "domain";

@injectable()
export default class Token extends EventEmitter {
    protected value?: TokenData;
    protected expiresAt?: Date;
    protected code?: string;

    protected readonly environment: Environment;
    constructor(@inject(IoC.Environment) environment: Environment) {
        super();
        this.environment = environment;
        this.code = this.environment.get<string>('auth.code');
    }

    isExpired(): boolean {
        const now = new Date;
        if (this.expiresAt === undefined) {
            return false;
        }
        return now > this.expiresAt;
    }

    getCode() {
        return this.code;
    }

    setCode(code: string) {
        this.code = code;
    }

    hasCode() {
        return this.code !== undefined;
    }

    exists() {
        return this.value !== undefined;
    }

    setValue(value: TokenData) {
        this.emit('set', value);
        this.value = value;
        if (!value) {
            delete this.expiresAt;
            return;
        }
        if (!value.expires_at) {
            this.expiresAt = new Date;
            return;
        }

        this.expiresAt = new Date(value.expires_at);
    }

    getValue() {
        return this.value;
    }

    getBaseClientOptions() {
        const auth = this.environment.get<AuthOptions>('auth');
        if (!auth) {
            throw new Error('NO_AUTH_OPTIONS');
        }
        const {
            client_id,
            client_secret,
            redirect_uri
        } = auth;

        return {
            client_id,
            client_secret,
            redirect_uri
        };
    }

    async fetch() {
        this.emit( 'beforeFetch', this );
        const baseClientOptions = this.getBaseClientOptions();
        const code = this.environment.get<string>('auth.code');

        const data = {
            ...baseClientOptions,
            code,
            grant_type: 'authorization_code',
        };

        const response = await this.makeRequest(data);
        this.handleResponse(response);
        return response;
    }

    async refresh() {
        this.emit( 'beforeRefresh', this );
        const baseClientOptions = this.getBaseClientOptions();
        const token = this.getValue();
        if (!token) {
            throw new Error('NO_TOKEN');
        }
        const { refresh_token } = token,
            data = {
                ...baseClientOptions,
                refresh_token,
                grant_type: 'refresh_token',
            };

        const response = await this.makeRequest(data);
        this.handleResponse(response);
        return response;
    }

    handleResponse(apiResponse: APIResponse<TokenData>) {
        const token: TokenData = apiResponse.data;
        if (!token.token_type) {
            return;
        }
        const { headers } = apiResponse.response;
        if (!token.expires_at && headers.date) {
            const responseAt = new Date(headers.date);
            const responseTimestamp = responseAt.getTime();
            const expiresIn = token.expires_in * 1000;

            token.expires_at = responseTimestamp + expiresIn;
        }
        this.setValue(token);
    }

    protected makeRequest(data: StringValueObject) {
        const domain = this.environment.get<string>('domain');
        const method = 'POST';
        const url = schema.auth.token;
        const config = {
            domain,
            method,
            data,
            url
        };
        const request = new DomainRequest(config);
        return request.process<TokenData>();
    }
}