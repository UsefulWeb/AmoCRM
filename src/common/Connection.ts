import EventEmitter from "./EventEmitter";
import { IAPIResponse, IAuthOptions, IAuthServerOptions, IRequestOptions } from "../interfaces/common";
import { IToken } from "./Token";
import { IEnvironment } from "./Environment";
import DomainRequest from "./DomainRequest";
import AuthServer from "./AuthServer";
import { IAuth } from "./Auth";

export interface IConnection {
    update(): Promise<boolean>;
    isTokenExpired(): boolean;
    connect(): Promise<boolean>;
    makeRequest<T>(method: string, url: string, data?: object, options?: IRequestOptions<T>): Promise<IAPIResponse<T>>;
}

/**
 * Компонент управления соединением с порталом
 * Доступен как client.connection
 * */
export default class Connection extends EventEmitter implements IConnection {
    protected readonly token: IToken;
    protected readonly environment: IEnvironment;
    protected readonly auth: IAuth;

    protected connected = false;
    protected authServer: AuthServer | null = null;

    constructor(environment: IEnvironment, token: IToken, auth: IAuth) {
        super();
        this.token = token;
        this.environment = environment;
        this.auth = auth;
    }

    /**
     * При отсуствии OAuth-токена пытается его получить
     * При устаревшем OAuth-токене пытается его обновить
     * */
    async update(): Promise<boolean> {
        if (!this.connected) {
            return await this.connect();
        }

        if (this.token.exists() && this.isTokenExpired()) {
            await this.token.refresh();
            return this.isTokenExpired();
        }

        return true;
    }

    /**
     * Проверяет, не истёк ли токен авторизации
     * */
    public isTokenExpired(): boolean {
        const expired = this.token.isExpired();
        this.connected = !expired;
        return expired;
    }

    /**
     * Устанавливает соединение с порталом
     * При наличии сервера авторизации, пытается через него получить код авторизации
     * При наличии кода, пытается получить OAuth-токен
     * */
    async connect(): Promise<boolean> {
        if (this.connected) {
            return true;
        }

        this.emit('beforeConnect');

        const code = this.environment.get<string>('auth.code');
        const hasCode = Boolean(code);
        const hasAuthServer = this.environment.exists('auth.server');
        const tokenExists = this.token.exists();
        if (!hasCode && hasAuthServer) {
            await this.waitForUserAction();
            return true;
        }
        if (tokenExists && this.isTokenExpired()) {
            await this.token.refresh();
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
            await this.token.fetch();
            this.emit('connected');
            this.connected = true;
            return true;
        }
        catch (e) {
            this.emit('connectionError', e);
            throw e;
        }
    }

    /**
     * Запускает сервер авторизации и ожидает перехода пользователя
     * по OAuth-адресу. Адрес можно получить с помощью {@link Auth.getUrl | client.auth.getUrl}
     * */
    protected async waitForUserAction(): Promise<boolean> {
        if (this.authServer) {
            return false;
        }
        const authOptions = this.environment.get<IAuthOptions>('auth');
        const port = authOptions?.server?.port || 3000;
        const state = <string>this.environment.get<string>('auth.state');
        const options: IAuthServerOptions = {
            state,
            port
        };
        const server = new AuthServer(options);
        server.subscribe(this);
        this.authServer = server;

        const code: string = await new Promise( resolve => {
            server.on('code', resolve);
            server.run();
        });

        await server.stop();

        this.authServer.unsubscribe(this);
        this.authServer = null;

        this.environment.set('auth.code', code);

        return this.connect();
    }

    /**
     * Формирует запрос к порталу. Предварительно проверяет наличие соединения
     * При его отсутствии пытается его установить
     * */
    async makeRequest<T>(method: string, url: string, data?: object, options?: IRequestOptions<T>) {
        await this.update();
        const token = this.token.getValue();
        const domain = <string>this.environment.get<string>('domain');
        const config = {
            domain,
            method,
            url,
            data,
            options,
            token
        };
        const domainRequest = new DomainRequest(config);
        return await domainRequest.process();
    }
}