import { injectable } from "inversify";
import EventEmitter from "./EventEmitter";
import ConnectionOptions from "./interfaces/common";
import Token from "./Token";

@injectable()
export default class Connection extends EventEmitter {
    protected readonly domainRequest: DomainRequest;
    protected readonly options: ConnectionOptions;
    protected tokenRepository: Token;
    protected connected: boolean = false;
    protected lastRequestAt: Date | null = null;
    constructor(options: ConnectionOptions) {
        super();
        this.domainRequest = new DomainRequest(options.domain);
        this.tokenRepository = new Token(this.domainRequest);
        this.options = options;
    }

    update(): Promise<boolean> {
        if (!this.connected) {
            return this.connect();
        }
        this.emit( 'checkToken', true );

        if (!this.token || this.request.expired) {
            return this.token.refresh();
        }

        return Promise.resolve(true);
    }

    request( ...args: any[] ) {
        return this.update()
            .then(
                () => this.domainRequest.request(...args)
            );
    }
}