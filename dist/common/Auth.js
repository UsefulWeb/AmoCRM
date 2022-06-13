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
    /**
     * Устанавливает код авторизации и убирает информацию о текущем токене
     * */
    setCode(code) {
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