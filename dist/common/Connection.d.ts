import EventEmitter from "./EventEmitter";
import { IRequestOptions } from "../interfaces/common";
import Token from "./Token";
import Environment from "./Environment";
import AuthServer from "./AuthServer";
import Auth from "./Auth";
/**
 * Компонент управления соединением с порталом
 * Доступен как client.connection
 * */
export default class Connection extends EventEmitter {
    protected readonly token: Token;
    protected readonly environment: Environment;
    protected readonly auth: Auth;
    protected connected: boolean;
    protected authServer: AuthServer | null;
    constructor(environment: Environment, token: Token, auth: Auth);
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
    makeRequest<T>(method: string, url: string, data?: object, options?: IRequestOptions): Promise<import("../interfaces/common").IAPIResponse<T>>;
}
