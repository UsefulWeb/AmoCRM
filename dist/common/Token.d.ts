import EventEmitter from "./EventEmitter";
import { IAPIResponse, ITokenData } from "../interfaces/common";
import Environment from "./Environment";
import { TStringValueObject } from "../types";
export default class Token extends EventEmitter {
    protected value?: ITokenData;
    protected expiresAt?: Date;
    protected code?: string;
    protected readonly environment: Environment;
    constructor(environment: Environment);
    isExpired(): boolean;
    clear(): void;
    exists(): boolean;
    setValue(value: ITokenData): void;
    getValue(): ITokenData | undefined;
    getBaseClientOptions(): {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    };
    fetch(): Promise<ITokenData | undefined>;
    refresh(): Promise<ITokenData | undefined>;
    handleResponse(apiResponse: IAPIResponse<ITokenData>): ITokenData | undefined;
    protected makeRequest(data: TStringValueObject): Promise<IAPIResponse<ITokenData>>;
}
