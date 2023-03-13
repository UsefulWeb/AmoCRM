import { EventEmitter } from "./EventEmitter";
import { IEnvironment } from "./Environment";
import { IToken } from "./Token";
export interface IAuth {
    /**
     * Устанавливает код авторизации и убирает информацию о текущем токене
     * */
    setCode(code: string): void;
    /**
     * Возвращает адрес OAuth-авторизации
     * cм. https://www.amocrm.ru/developers/content/oauth/step-by-step#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-Authorization-code
     *
     * @param mode popup или post_messageю
     * */
    getUrl(mode?: string): string;
}
/**
 * Компонент авторизации.
 * Доступен как client.auth
 * */
export declare class Auth extends EventEmitter implements IAuth {
    protected readonly environment: IEnvironment;
    protected readonly token: IToken;
    constructor(environment: IEnvironment, token: IToken);
    setCode(code: string): void;
    getUrl(mode?: string): string;
}
