import { IClientOptions } from "../interfaces/common";
declare class Environment {
    protected readonly options: IClientOptions;
    constructor(options: IClientOptions);
    get<T>(path?: string, defaultValue?: any): T;
    set(path: string, value?: any): void;
    exists(path: string): boolean;
}
export default Environment;
