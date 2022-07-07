"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const qs = tslib_1.__importStar(require("qs"));
const EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
/**
 * Компонент авторизации.
 * Доступен как client.auth
 * */
class Auth extends EventEmitter_1.default {
    constructor(environment, token) {
        super();
        this.environment = environment;
        this.token = token;
    }
    setCode(code) {
        this.environment.set('auth.code', code);
        this.token.clear();
    }
    getUrl(mode = 'popup') {
        const baseUrl = 'https://www.amocrm.ru/oauth';
        const options = this.environment.get();
        const { client_id } = options.auth;
        const params = {
            client_id,
            mode
        };
        const state = this.environment.get('auth.state');
        if (state) {
            params.state = state;
        }
        const paramsStr = qs.stringify(params);
        return `${baseUrl}?${paramsStr}`;
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map