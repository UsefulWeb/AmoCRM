import EventEmitter from "./EventEmitter";
import Environment from "./Environment";
import Token from "./Token";
/**
 * Компонент авторизации.
 * Доступен как client.auth
 * */
export default class Auth extends EventEmitter {
    protected readonly environment: Environment;
    protected readonly token: Token;
    constructor(environment: Environment, token: Token);
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
