import { EventEmitter } from "./EventEmitter";
import { IAPIResponse, IRequestOptions } from "../interfaces/common";
import { IToken } from "./Token";
import { IEnvironment } from "./Environment";
import { IAuthServer } from "./AuthServer";
import { IAuth } from "./Auth";
export interface IConnection {
    update(): Promise<boolean>;
    isTokenExpired(): boolean;
    connect(): Promise<boolean>;
    makeRequest<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
}
/**
 * Компонент управления соединением с порталом
 * Доступен как client.connection
 * */
export declare class Connection extends EventEmitter implements IConnection {
    protected readonly token: IToken;
    protected readonly environment: IEnvironment;
    protected readonly auth: IAuth;
    protected connected: boolean;
    protected authServer: IAuthServer | null;
    constructor(environment: IEnvironment, token: IToken, auth: IAuth);
    /**
     * При отсуствии OAuth-токена пытается его получить
     * При устаревшем OAuth-токене пытается его обновить
     * */
    update(): Promise<boolean>;
    /**
     * Проверяет, не истёк ли токен авторизации
     * */
    isTokenExpired(): boolean;
    /**
     * Устанавливает соединение с порталом
     * При наличии сервера авторизации, пытается через него получить код авторизации
     * При наличии кода, пытается получить OAuth-токен
     * */
    connect(): Promise<boolean>;
    /**
     * Запускает сервер авторизации и ожидает перехода пользователя
     * по OAuth-адресу. Адрес можно получить с помощью {@link Auth.getUrl | client.auth.getUrl}
     * */
    protected waitForUserAction(): Promise<boolean>;
    /**
     * Формирует запрос к порталу. Предварительно проверяет наличие соединения
     * При его отсутствии пытается его установить
     * */
    makeRequest<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<IAPIResponse<T>>;
}
