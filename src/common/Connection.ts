import EventEmitter from "./EventEmitter";
import { AuthOptions, AuthServerOptions, RequestOptions } from "../interfaces/common";
import Token from "./Token";
import Environment from "./Environment";
import { JSONValue, RequestData } from "../types";
import DomainRequest from "./DomainRequest";
import AuthServer from "./AuthServer";
import Auth from "./Auth";

export default class Connection extends EventEmitter {
    protected readonly token: Token;
    protected readonly environment: Environment;
    protected readonly auth: Auth;

    protected connected: boolean = false;
    protected authServer: AuthServer | null = null;

    constructor(environment: Environment, token: Token, auth: Auth) {
        super();
        this.token = token;
        this.environment = environment;
        this.auth = auth;
    }

    async update(): Promise<boolean> {
        if (!this.connected) {
            return await this.connect();
        }

        this.emit('check', true);
        if (this.token.exists() && this.isTokenExpired()) {
            await this.token.refresh();
            return this.isTokenExpired();
        }

        return true;
    }

    public isTokenExpired(): boolean {
        const expired = this.token.isExpired();
        this.connected = !expired;
        return expired;
    }

    async connect(): Promise<boolean> {
        if (this.connected) {
            return true;
        }

        this.emit('beforeConnect');

        const hasCode = this.auth.hasCode();
        const hasAuthServer = this.environment.exists('auth.server');
        const tokenExists = this.token.exists();

        if (!hasCode && hasAuthServer) {
            await this.waitForUserAction();
            return true;
        }

        this.emit('check', true);
        if (tokenExists && this.isTokenExpired()) {
            await this.token.refresh();
            this.connected = this.token.isExpired();
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
            this.emit('error', e);
            throw e;
        }
    }

    protected async waitForUserAction(): Promise<boolean> {
        if (this.authServer) {
            return false;
        }
        const authOptions = this.environment.get<AuthOptions>('auth');
        const port = 3000 || authOptions.server?.port
        const state = this.auth.getState();
        const options: AuthServerOptions = {
            state,
            port
        };
        const server = new AuthServer(options);
        server.subscribe(this);
        this.authServer = server;

        const code: string = await new Promise( resolve => {
            server.on('code', event => {
                const { code } = event;
                resolve(code);
            });
            server.run();
        });

        await server.stop();

        this.authServer.unsubsscribe(this);
        this.authServer = null;

        this.auth.setCode(code);

        return this.connect();
    }

    async makeRequest(method: string, url: string, data?: RequestData, options?: RequestOptions) {
        await this.update();
        const token = this.token.getValue();
        const domain = this.environment.get<string>('domain');
        const config = {
            domain,
            method,
            url,
            data,
            options,
            token
        };
        const domainRequest = new DomainRequest(config);
        return await domainRequest.process<JSONValue>();
    }
}