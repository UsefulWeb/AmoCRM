import * as http from "http";
import EventEmitter from "./EventEmitter";
import { AuthServerOptions } from "../interfaces/common";
import { StringValueObject } from "../types";

export default class AuthServer extends EventEmitter {
    protected readonly options: AuthServerOptions;
    protected instance?: http.Server;
    constructor(options: AuthServerOptions) {
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
                .on('close', resolve)
                .on('error', reject)
        });
    }
    handle(request: http.IncomingMessage, response: http.ServerResponse) {
        console.log('handled auth server callback');
        if (!request.url) {
            response.end('NO_URL');
            return;
        }
        const params = request.url.substring(2);
        const searchParams = new URLSearchParams(params);
        const query: StringValueObject = Object.fromEntries(searchParams);
        const currentState = this.options.state;
        const { code, state } = query;
        if (!code) {
            response.end('NO_CODE');
            return;
        }
        if (currentState && state !== currentState) {
            response.end('STATE_MISMATCH');
            return;
        }
        this.emit( 'code', {
            code,
            state
        });

        response.end('VALID_CODE');
    }
}