"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
/**
 * Простой сервер авторизации для получения OAuth-токена
 * */
class AuthServer extends EventEmitter_1.default {
    constructor(options) {
        super();
        this.options = options;
    }
    /**
     * Запускает сервер на заданном в {@link options} порту
     * */
    run() {
        const { port } = this.options;
        const handler = this.handle.bind(this);
        const onListenStart = this.onListenStart.bind(this);
        this.instance = http
            .createServer(handler)
            .listen(port, onListenStart);
    }
    /**
     * Обработчик успешного запуска сервера
     * */
    onListenStart() {
        const { port } = this.options;
        console.log(`auth server listening on port ${port}`);
        this.emit('listen');
    }
    /**
     * Останавливает сервер
     * */
    stop() {
        return new Promise((resolve, reject) => {
            if (this.instance === undefined) {
                return resolve();
            }
            this.instance
                .on('close', () => {
                this.emit('close');
                resolve();
            })
                .on('error', e => {
                this.emit('serverError', e);
                reject();
            });
            this.instance.close();
        });
    }
    /**
     * Обработчик запроса, поступающего на адрес запущенного сервера
     * */
    handle(request, response) {
        const { url } = request;
        console.log('handled auth server callback');
        if (!url) {
            response.end('NO_URL');
            return;
        }
        const urlParams = url.substring(2);
        const searchParams = new URLSearchParams(urlParams);
        const queryString = Object.fromEntries(searchParams);
        const currentState = this.options.state;
        const { code, state } = queryString;
        if (!code) {
            response.end('NO_CODE');
            return;
        }
        if (currentState && state !== currentState) {
            response.end('STATE_MISMATCH');
            return;
        }
        console.log('handled auth code:', code);
        this.emit('code', code);
        response.end('VALID_CODE');
    }
}
exports.default = AuthServer;
//# sourceMappingURL=AuthServer.js.map