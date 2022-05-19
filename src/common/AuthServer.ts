import http from "http";
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
        console.log( `auth server listening on port ${port}` );
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
        const { url } = request;
        if (!url) {
            return;
        }
        const location = new URL(url);
        const queryEntries = location.searchParams.entries();
        const query: StringValueObject = Object.fromEntries(queryEntries);
        const currentState = this.options.state;
        const { code, state } = query;
        response.end();
        if (!code) {
            return;
        }
        if (currentState && state !== currentState) {
            return;
        }
        this.emit( 'code', {
            code,
            state
        });
    }
}