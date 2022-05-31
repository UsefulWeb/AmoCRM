import EventEmitter from "./EventEmitter";
import { IAPIResponse, IAuthOptions, ITokenData } from "../interfaces/common";
import schema from "../schema/v4";
import Environment from "./Environment";
import DomainRequest from "./DomainRequest";
import { TStringValueObject } from "../types";

export default class Token extends EventEmitter {
    protected value?: ITokenData;
    protected expiresAt?: Date;
    protected code?: string;

    protected readonly environment: Environment;
    constructor(environment: Environment) {
        super();
        this.environment = environment;
    }

    isExpired(): boolean {
        this.emit('expirationCheck');
        const now = new Date;
        if (this.expiresAt === undefined) {
            return false;
        }
        return now > this.expiresAt;
    }

    clear() {
        this.value = undefined;
        delete this.expiresAt;
    }

    exists() {
        return this.value !== null;
    }

    setValue(value: ITokenData) {
        this.emit('beforeChange');
        this.value = value;

        let expiresAt = value.expires_at;
        if (!expiresAt) {
            const now = new Date;
            expiresAt = now.valueOf() + value.expires_in * 1000;
        }
        this.expiresAt = new Date(expiresAt);

        this.emit('change');
    }

    getValue() {
        return this.value;
    }

    getBaseClientOptions() {
        const auth = this.environment.get<IAuthOptions>('auth');
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
        const code = this.environment.get<string>('auth.code');

        if (!code) {
            throw new Error('NO_AUTH_CODE');
        }

        const data: TStringValueObject = {
            ...baseClientOptions,
            code,
            grant_type: 'authorization_code',
        };
        const response = await this.makeRequest(data);
        const tokenResponse = this.handleResponse(response);
        this.emit( 'fetch');
        return tokenResponse;
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
        const tokenResponse = this.handleResponse(response);
        this.emit('refresh');
        return tokenResponse;
    }

    handleResponse(apiResponse: IAPIResponse<ITokenData>) {
        const token: ITokenData = apiResponse.data;
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

    protected makeRequest(data: TStringValueObject) {
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
        return request.process<ITokenData>();
    }
}