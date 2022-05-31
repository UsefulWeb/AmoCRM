import * as http from "http";
import EventEmitter from "./EventEmitter";
import { IAuthServerOptions } from "../interfaces/common";
import { TStringValueObject } from "../types";

export default class AuthServer extends EventEmitter {
    protected readonly options: IAuthServerOptions;
    protected instance?: http.Server;
    constructor(options: IAuthServerOptions) {
        super();
        this.options = options;
    }
    run() {
        const { port } = this.options;
        const handler = this.handle.bind(this);
        const onListenStart = this.onListenStart.bind(this);

        this.instance = http
            .createServer(handler)
            .listen(port, onListenStart);
    }
    onListenStart() {
        const { port } = this.options;
        console.log(`auth server listening on port ${port}`);
        this.emit('listen');
    }
    stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.instance === undefined) {
                return resolve();
            }
            this.instance.close()
                .on('close', () => {
                    this.emit('close');
                    resolve();
                })
                .on('error', e => {
                    this.emit('serverError', e);
                    reject();
                });
        });
    }
    handle(request: http.IncomingMessage, response: http.ServerResponse) {
        const { url } = request;
        console.log('handled auth server callback');
        if (!url) {
            response.end('NO_URL');
            return;
        }
        const urlParams = url.substring(2);
        const searchParams = new URLSearchParams(urlParams);
        const queryString: TStringValueObject = Object.fromEntries(searchParams);
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

        this.emit( 'code', code);

        response.end('VALID_CODE');
    }
}