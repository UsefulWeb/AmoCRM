import EventEmitter from "./EventEmitter";
import Environment from "./Environment";
import Token from "./Token";
export default class Auth extends EventEmitter {
    protected readonly environment: Environment;
    protected readonly token: Token;
    constructor(environment: Environment, token: Token);
    setCode(code: string): void;
    getUrl(mode?: string): string;
}
