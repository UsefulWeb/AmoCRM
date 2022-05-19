import { inject, injectable, LazyServiceIdentifer } from "inversify";
import EventEmitter from "./EventEmitter";
import {AuthServerOptions, RequestOptions} from "../interfaces/common";
import Token from "./Token";
import Environment from "./Environment";
import {IoC, RequestData} from "../types";
import DomainRequest from "./DomainRequest";
import AuthServer from "./AuthServer";

@injectable()
export default class Connection extends EventEmitter {
    protected connected: boolean = false;
    protected authServer: AuthServer | null = null;
    protected code: string | null;

    constructor(
        @inject(new LazyServiceIdentifer(() => IoC.Token)) protected readonly token: Token,
        @inject(new LazyServiceIdentifer(() => IoC.Environment)) protected readonly environment: Environment
    ) {
        super();
        this.code = this.environment.get('auth.code', null)
    }

    async update(): Promise<boolean> {
        if (!this.connected) {
            return await this.connect();
        }
        this.emit('check', true);

        if (this.token.exists() || this.isTokenExpired()) {
            await this.token.refresh();
            return this.isTokenExpired();
        }

        return true;
    }

    public setCode(code: string) {
        this.code = code;
    }

    public isTokenExpired(): boolean {
        const expired = this.token.isExpired();
        if (expired) {
            this.connected = false;
        }
        return expired;
    }

    async connect(): Promise<boolean> {
        if (this.connected) {
            return true;
        }

        this.emit('beforeConnect');

        const hasCode = this.code !== null;
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
        if (!hasCode && !tokenExists) {
            return false;
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
            return Promise.resolve(true);
        }
        const options: AuthServerOptions = this.environment.get('auth.server');
        const server = new AuthServer(options);

        this.authServer = server;

        const code: string = await new Promise( resolve => {
            server.on('code', event => {
                const { code } = event;
                resolve(code);
            });
            server.run();
        });

        await server.stop();
        this.authServer = null;
        this.setCode(code);
        return this.connect();
    }

    async makeRequest(method: string, url: string, data?: RequestData, options?: RequestOptions) {
        await this.update();
        const token = this.token.getValue();
        const domain: string = this.environment.get('domain');
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