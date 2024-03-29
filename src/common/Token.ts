import { EventEmitter } from "./EventEmitter";
import { IDomainRequestOptions, IAPIResponse, IAuthOptions, ITokenData } from "../interfaces/common";
import schema from "../schema/v4";
import { IEnvironment } from "./Environment";
import DomainRequest from "./DomainRequest";
import { TStringValueObject } from "../types";

export interface IToken extends EventEmitter {
    /**
     * Проверяет, истёк ли токен
     * */
    isExpired(): boolean;
    /**
     * Стирает информацию о текущем токене
     * */
    clear(): void;
    /**
     * Проверяет, существует ли текущий токен
     * */
    exists(): boolean;
    /**
     * Устанавливает текущее значение токена
     * */
    setValue(value: ITokenData): void;
    /**
     * Возвращает текущее значение токена
     * */
    getValue(): ITokenData | undefined;
    /**
     * Получает токен по коду авторизации
     * */
    fetch(): Promise<ITokenData | undefined>;
    /**
     * Обновляет токен по значению refresh_token
     * */
    refresh(): Promise<ITokenData | undefined>;
}


/**
 * Компонент управления текущим oAuth-токеном
 * Доступен как client.token
 * */
export class Token extends EventEmitter {
    protected value?: ITokenData;
    protected expiresAt?: Date;
    protected code?: string;

    protected readonly environment: IEnvironment;
    constructor(environment: IEnvironment) {
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
        return this.value !== undefined;
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

    /**
     * Возвращает базовые настройки клиентского приложения AmoCRM: id, secret, redirect_uri
     * */
    protected getBaseClientOptions() {
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

    protected handleResponse(apiResponse: IAPIResponse<ITokenData>) {
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
        const config: IDomainRequestOptions = {
            domain,
            method,
            data,
            url
        };
        const request = new DomainRequest<ITokenData>(config);
        return request.process();
    }
}