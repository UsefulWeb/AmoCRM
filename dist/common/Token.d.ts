import { EventEmitter } from "./EventEmitter";
import { IAPIResponse, ITokenData } from "../interfaces/common";
import { IEnvironment } from "./Environment";
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
export declare class Token extends EventEmitter {
    protected value?: ITokenData;
    protected expiresAt?: Date;
    protected code?: string;
    protected readonly environment: IEnvironment;
    constructor(environment: IEnvironment);
    isExpired(): boolean;
    clear(): void;
    exists(): boolean;
    setValue(value: ITokenData): void;
    getValue(): ITokenData | undefined;
    /**
     * Возвращает базовые настройки клиентского приложения AmoCRM: id, secret, redirect_uri
     * */
    protected getBaseClientOptions(): {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    };
    fetch(): Promise<ITokenData | undefined>;
    refresh(): Promise<ITokenData | undefined>;
    protected handleResponse(apiResponse: IAPIResponse<ITokenData>): ITokenData | undefined;
    protected makeRequest(data: TStringValueObject): Promise<IAPIResponse<ITokenData>>;
}
