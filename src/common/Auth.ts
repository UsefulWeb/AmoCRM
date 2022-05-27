import * as qs from "qs";
import EventEmitter from "./EventEmitter";
import Environment from "./Environment";

import { AuthUrlParams, ClientOptions } from "../interfaces/common";

export default class Auth extends EventEmitter{
    protected readonly environment: Environment;
    constructor(environment: Environment) {
        super();
        this.environment = environment;
    }

    getUrl(mode = 'popup') {
        const baseUrl = 'https://www.amocrm.ru/oauth';
        const options = this.environment.get<ClientOptions>();
        const { client_id } = options.auth;
        const params: AuthUrlParams = {
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