"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const tslib_1 = require("tslib");
const EventEmitter_1 = require("./EventEmitter");
const DomainRequest_1 = tslib_1.__importDefault(require("./DomainRequest"));
const AuthServer_1 = require("./AuthServer");
/**
 * Компонент управления соединением с порталом
 * Доступен как client.connection
 * */
class Connection extends EventEmitter_1.EventEmitter {
    constructor(environment, token, auth) {
        super();
        this.connected = false;
        this.authServer = null;
        this.token = token;
        this.environment = environment;
        this.auth = auth;
    }
    /**
     * При отсуствии OAuth-токена пытается его получить
     * При устаревшем OAuth-токене пытается его обновить
     * */
    update() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.connected) {
                return yield this.connect();
            }
            if (this.token.exists() && this.isTokenExpired()) {
                yield this.token.refresh();
                return this.isTokenExpired();
            }
            return true;
        });
    }
    /**
     * Проверяет, не истёк ли токен авторизации
     * */
    isTokenExpired() {
        const expired = this.token.isExpired();
        this.connected = !expired;
        return expired;
    }
    /**
     * Устанавливает соединение с порталом
     * При наличии сервера авторизации, пытается через него получить код авторизации
     * При наличии кода, пытается получить OAuth-токен
     * */
    connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                return true;
            }
            this.emit('beforeConnect');
            const code = this.environment.get('auth.code');
            const hasCode = Boolean(code);
            const hasAuthServer = this.environment.exists('auth.server');
            const tokenExists = this.token.exists();
            if (!hasCode && hasAuthServer) {
                yield this.waitForUserAction();
                return true;
            }
            if (tokenExists && this.isTokenExpired()) {
                yield this.token.refresh();
                this.connected = this.token.isExpired();
                return this.connected;
            }
            if (tokenExists) {
                this.connected = true;
                return this.connected;
            }
            if (!hasCode && !tokenExists) {
                throw new Error('NO_TOKEN_AND_CODE');
            }
            try {
                yield this.token.fetch();
                this.emit('connected');
                this.connected = true;
                return true;
            }
            catch (e) {
                this.emit('connectionError', e);
                throw e;
            }
        });
    }
    /**
     * Запускает сервер авторизации и ожидает перехода пользователя
     * по OAuth-адресу. Адрес можно получить с помощью {@link Auth.getUrl | client.auth.getUrl}
     * */
    waitForUserAction() {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.authServer) {
                return false;
            }
            const authOptions = this.environment.get('auth');
            const port = ((_a = authOptions === null || authOptions === void 0 ? void 0 : authOptions.server) === null || _a === void 0 ? void 0 : _a.port) || 3000;
            const state = this.environment.get('auth.state');
            const options = {
                state,
                port
            };
            const server = new AuthServer_1.AuthServer(options);
            server.subscribe(this);
            this.authServer = server;
            const code = yield new Promise(resolve => {
                server.on('code', resolve);
                server.run();
            });
            yield server.stop();
            this.authServer.unsubscribe(this);
            this.authServer = null;
            this.environment.set('auth.code', code);
            return this.connect();
        });
    }
    /**
     * Формирует запрос к порталу. Предварительно проверяет наличие соединения
     * При его отсутствии пытается его установить
     * */
    makeRequest(method, url, data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.update();
            const token = this.token.getValue();
            const domain = this.environment.get('domain');
            const config = {
                domain,
                method,
                url,
                data,
                options,
                token
            };
            const domainRequest = new DomainRequest_1.default(config);
            return yield domainRequest.process();
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map