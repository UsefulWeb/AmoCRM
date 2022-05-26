import EventEmitter from "./EventEmitter";
import { APIResponse, AuthOptions, TokenData } from "../interfaces/common";
import schema from "../schema/v4";
import Environment from "./Environment";
import { StringValueObject } from "../types";
import DomainRequest from "./DomainRequest";
import Auth from "./Auth";

export default class Token extends EventEmitter {
    protected value?: TokenData;
    protected expiresAt?: Date;
    protected code?: string;

    protected readonly environment: Environment;
    protected readonly auth: Auth;
    constructor(environment: Environment, auth: Auth) {
        super();
        this.environment = environment;
        this.auth = auth;
    }

    isExpired(): boolean {
        const now = new Date;
        if (this.expiresAt === undefined) {
            return false;
        }
        return now > this.expiresAt;
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
        this.emit( 'beforeFetch');
        const baseClientOptions = this.getBaseClientOptions();
        const code = this.auth.getCode();

        if (!code) {
            throw new Error('NO_AUTH_CODE');
        }

        const data: StringValueObject = {
            ...baseClientOptions,
            code,
            grant_type: 'authorization_code',
        };
        const response = await this.makeRequest(data);
        return this.handleResponse(response);
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
        return this.handleResponse(response);
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
        return token;
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
        console.log({config});
        const request = new DomainRequest(config);
        return request.process<TokenData>();
    }
}