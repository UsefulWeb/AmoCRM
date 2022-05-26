import { ClientOptions } from "../interfaces/common";

class Environment {
    protected readonly options: ClientOptions;
    constructor(options: ClientOptions) {
        this.options = options;
    }
    get<T>(path?: string, defaultValue?: any): T {
        if (!this.options) {
            return defaultValue;
        }
        let value: any = this.options;
        if (!path) {
            return value;
        }
        const parts = path.split('.');
        for (const key of parts) {
            if (!value) {
                return defaultValue;
            }
            value = value[key];
        }
        if (value === undefined) {
            return defaultValue;
        }
        return value;
    }

    exists(path: string): boolean {
        return this.get(path) !== undefined;
    }
}

export default Environment;