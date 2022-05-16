import { injectable } from "inversify";

import EventEmitter from "./EventEmitter";
import TokenOptions from "./interfaces/common";
import schema from "./schema/v4";

@injectable()
export default class Token extends EventEmitter {
    protected readonly options: TokenOptions;
    protected readonly request: DomainRequest;
    protected value: any;
    protected expires: Date | null = null;

    constructor(options: TokenOptions) {
        super();
        this.options = options;
    }

    setValue(token) {
        this.value = token;
        if (!token) {
            this.expires = null;
            return;
        }
        if (!token.expires_at) {
            this.expires = new Date;
            return;
        }

        this.expires = new Date(token.expires_at);
    }

    getValue() {
        return this.value;
    }

    getBaseClientOptions() {
        const {
            client_id,
            client_secret,
            redirect_uri
        } = this.options;

        return {
            client_id,
            client_secret,
            redirect_uri
        };
    }

    fetch() {
        this.emit( 'beforeTokenFetch', this );
        const baseClientOptions = this.getBaseClientOptions();
        const { code } = this.options;

        const data = {
            ...baseClientOptions,
            code,
            grant_type: 'authorization_code',
        };

        return this.request.post(schema.auth.token, data)
            .then(response => {
                this.handleResponse(response);
                return response;
            });
    }

    refreshToken() {
        this.emit( 'beforeRefreshToken', this );
        const baseClientOptions = this.getBaseClientOptions();
        const token = this.getValue();
        if (!token) {
            console.log('no token');
            return Promise.reject('no token');
        }
        const { refresh_token } = token,
            data = {
                ...baseClientOptions,
                refresh_token,
                grant_type: 'refresh_token',
            };

        return this.request.post(schema.auth.token, data)
            .then(response => {
                this.handleResponse(response);
                return response;
            });
    }

    handleResponse(response) {
        const token = response.data;
        if (!token.token_type) {
            return;
        }

        if (!token.expires_at) {
            const { headers } = response.info,
                responseAt = new Date(headers.date),
                responseTimestamp = responseAt.getTime(),
                expiresIn = token.expires_in * 1000;

            token.expires_at = responseTimestamp + expiresIn;
        }

        const event = {
            ...response,
            data: token
        };
        this.emit('newToken', event);
        this.setValue(token);
    }
}