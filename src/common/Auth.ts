import * as qs from "qs";
import EventEmitter from "./EventEmitter";
import Environment from "./Environment";

import { IAuthUrlParams, IClientOptions } from "../interfaces/common";
import Token from "./Token";

export default class Auth extends EventEmitter{
    protected readonly environment: Environment;
    protected readonly token: Token;
    constructor(environment: Environment, token: Token) {
        super();
        this.environment = environment;
        this.token = token;
    }

    public setCode(code: string) {
        this.environment.set('auth.code', code);
        this.token.clear();
    }

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