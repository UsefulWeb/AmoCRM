import EventEmitter from "./EventEmitter";
import { APIResponse, TokenData } from "../interfaces/common";
import Environment from "./Environment";
import { StringValueObject } from "../types";
export default class Token extends EventEmitter {
    protected value?: TokenData;
    protected expiresAt?: Date;
    protected code?: string;
    protected readonly environment: Environment;
    constructor(environment: Environment);
    isExpired(): boolean;
    clear(): void;
    exists(): boolean;
    setValue(value: TokenData): void;
    getValue(): TokenData | undefined;
    getBaseClientOptions(): {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    };
    fetch(): Promise<TokenData | undefined>;
    refresh(): Promise<TokenData | undefined>;
    handleResponse(apiResponse: APIResponse<TokenData>): TokenData | undefined;
    protected makeRequest(data: StringValueObject): Promise<APIResponse<TokenData>>;
}
