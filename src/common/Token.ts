import http from 'http';
import { injectable } from "inversify";

import EventEmitter from "./EventEmitter";
import {APIResponse, JSONResponse, TokenData} from "../interfaces/common";
import schema from "../schema/v4";
import Environment from "./Environment";
import ClientRequest from "./ClientRequest";

@injectable()
export default class Token extends EventEmitter {
    protected value?: TokenData;
    protected expiresAt?: Date;

    constructor(
        protected readonly environment: Environment,
        protected readonly clientRequest: ClientRequest
    ) {
        super();
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
        const auth = this.environment.get('auth');
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

    fetch() {
        this.emit( 'beforeFetch', this );
        const baseClientOptions = this.getBaseClientOptions();
        const { code } = this.environment.get('auth.code');

        const data = {
            ...baseClientOptions,
            code,
            grant_type: 'authorization_code',
        };

        return this.clientRequest.post(schema.auth.token, data)
            .then(response => {
                this.handleResponse(response);
                return response;
            });
    }

    refresh() {
        this.emit( 'beforeRefresh', this );
        const baseClientOptions = this.getBaseClientOptions();
        const token = this.getValue();
        if (!token) {
            const error = new Error('NO_TOKEN');
            return Promise.reject(error);
        }
        const { refresh_token } = token,
            data = {
                ...baseClientOptions,
                refresh_token,
                grant_type: 'refresh_token',
            };

        return this.clientRequest.post(schema.auth.token, data)
            .then((response) => {
                this.handleResponse(response);
                return response;
            });
    }

    handleResponse(response: APIResponse) {
        const token: TokenData = response.data;
        if (!token.token_type) {
            return;
        }

        if (!token.expires_at) {
            const { headers } = response.info;
            const responseAt = new Date(headers.date);
            const responseTimestamp = responseAt.getTime();
            const expiresIn = token.expires_in * 1000;

            token.expires_at = responseTimestamp + expiresIn;
        }
        this.setValue(token);
    }
}