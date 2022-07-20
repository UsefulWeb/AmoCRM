"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tslib_1 = require("tslib");
const EventEmitter_1 = require("./EventEmitter");
const v4_1 = tslib_1.__importDefault(require("../schema/v4"));
const DomainRequest_1 = tslib_1.__importDefault(require("./DomainRequest"));
/**
 * Компонент управления текущим oAuth-токеном
 * Доступен как client.token
 * */
class Token extends EventEmitter_1.EventEmitter {
    constructor(environment) {
        super();
        this.environment = environment;
    }
    isExpired() {
        this.emit('expirationCheck');
        const now = new Date;
        if (this.expiresAt === undefined) {
            return false;
        }
        return now > this.expiresAt;
    }
    clear() {
        this.value = undefined;
        delete this.expiresAt;
    }
    exists() {
        return this.value !== undefined;
    }
    setValue(value) {
        this.emit('beforeChange');
        this.value = value;
        let expiresAt = value.expires_at;
        if (!expiresAt) {
            const now = new Date;
            expiresAt = now.valueOf() + value.expires_in * 1000;
        }
        this.expiresAt = new Date(expiresAt);
        this.emit('change');
    }
    getValue() {
        return this.value;
    }
    /**
     * Возвращает базовые настройки клиентского приложения AmoCRM: id, secret, redirect_uri
     * */
    getBaseClientOptions() {
        const auth = this.environment.get('auth');
        if (!auth) {
            throw new Error('NO_AUTH_OPTIONS');
        }
        const { client_id, client_secret, redirect_uri } = auth;
        return {
            client_id,
            client_secret,
            redirect_uri
        };
    }
    fetch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.emit('beforeFetch');
            const baseClientOptions = this.getBaseClientOptions();
            const code = this.environment.get('auth.code');
            if (!code) {
                throw new Error('NO_AUTH_CODE');
            }
            const data = Object.assign(Object.assign({}, baseClientOptions), { code, grant_type: 'authorization_code' });
            const response = yield this.makeRequest(data);
            const tokenResponse = this.handleResponse(response);
            this.emit('fetch');
            return tokenResponse;
        });
    }
    refresh() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.emit('beforeRefresh', this);
            const baseClientOptions = this.getBaseClientOptions();
            const token = this.getValue();
            if (!token) {
                throw new Error('NO_TOKEN');
            }
            const { refresh_token } = token, data = Object.assign(Object.assign({}, baseClientOptions), { refresh_token, grant_type: 'refresh_token' });
            const response = yield this.makeRequest(data);
            const tokenResponse = this.handleResponse(response);
            this.emit('refresh');
            return tokenResponse;
        });
    }
    handleResponse(apiResponse) {
        const token = apiResponse.data;
        if (!token.token_type) {
            return;
        }
        const { headers } = apiResponse.response;
        if (!token.expires_at && headers.date) {
            const responseAt = new Date(headers.date);
            const responseTimestamp = responseAt.getTime();
            const expiresIn = token.expires_in * 1000;
            token.expires_at = responseTimestamp + expiresIn;
        }
        this.setValue(token);
        return token;
    }
    makeRequest(data) {
        const domain = this.environment.get('domain');
        const method = 'POST';
        const url = v4_1.default.auth.token;
        const config = {
            domain,
            method,
            data,
            url
        };
        const request = new DomainRequest_1.default(config);
        return request.process();
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map