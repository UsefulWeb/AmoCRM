import * as qs from "qs";
import EventEmitter from "./EventEmitter";
import Environment from "./Environment";

import { IAuthUrlParams, IClientOptions } from "../interfaces/common";
import Token from "./Token";

/**
 * Компонент авторизации.
 * Доступен как client.auth
 * */
export default class Auth extends EventEmitter{
    protected readonly environment: Environment;
    protected readonly token: Token;
    constructor(environment: Environment, token: Token) {
        super();
        this.environment = environment;
        this.token = token;
    }

    /**
     * Устанавливает код авторизации и убирает информацию о текущем токене
     * */
    public setCode(code: string) {
        this.environment.set('auth.code', code);
        this.token.clear();
    }

    /**
     * Возвращает адрес OAuth-авторизации
     * cм. https://www.amocrm.ru/developers/content/oauth/step-by-step#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-Authorization-code
     *
     * @param mode popup или post_messageю
     * */
    getUrl(mode = 'popup') {
        const baseUrl = 'https://www.amocrm.ru/oauth';
        const options = this.environment.get<IClientOptions>();
        const { client_id } = options.auth;
        const params: IAuthUrlParams = {
            client_id,
            mode
        };
        const state = this.environment.get<string>('auth.state');

        if (state) {
            params.state = state;
        }

        const paramsStr = qs.stringify(params);
        return `${baseUrl}?${paramsStr}`;
    }
}