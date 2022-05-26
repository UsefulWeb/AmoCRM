import qs from "qs";
import EventEmitter from "./EventEmitter";
import Environment from "./Environment";

import { AuthOptions, AuthUrlParams, ClientOptions } from "../interfaces/common";

export default class Auth extends EventEmitter{
    protected readonly environment: Environment;
    protected state: string;
    protected code: string;
    constructor(environment: Environment) {
        super();
        this.environment = environment;
        const auth = environment.get<AuthOptions>('auth');
        if (!auth) {
            throw new Error('NO_AUTH_OPTIONS');
        }
        const { code = '', state = '' } = auth;
        this.state = state;
        this.code = code;
    }

    getState() {
        return this.state;
    }

    setState(state: string) {
        this.state = state;
    }

    getCode() {
        return this.code;
    }

    setCode(code: string) {
        this.code = code;
    }

    hasCode() {
        return this.code !== undefined;
    }

    getUrl(mode = 'popup') {
        const baseUrl = 'https://www.amocrm.ru/oauth';
        const options = this.environment.get<ClientOptions>();
        const { client_id } = options.auth;
        const params: AuthUrlParams = {
            client_id,
            mode
        };
        const state = this.getState();

        if (state) {
            params.state = state;
        }

        const paramsStr = qs.stringify(params);
        return `${baseUrl}?${paramsStr}`;
    }
}