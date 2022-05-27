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

    set(path: string, value?: any) {
        if (!this.options) {
            throw new Error('NO_ENVIRONMENT_OPTIONS');
        }
        let handler: any = this.options;
        const parts = path.split('.');
        if (parts.length === 0) {
            throw new Error('PATH_IS_EMPTY');
        }
        for (let i = 0; i < parts.length - 1; i++) {
            const key = parts[i];
            if (!handler[key]) {
                handler[key] = {};
            }
            handler = handler[key];
        }
        const lastKey = parts.pop();
        if (!lastKey) {
            throw new Error('INVALID_PATH');
        }
        handler[lastKey] = value;
    }

    exists(path: string): boolean {
        return this.get(path) !== undefined;
    }
}

export default Environment;