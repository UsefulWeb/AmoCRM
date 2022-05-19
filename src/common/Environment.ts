import { injectable } from "inversify";
import { ClientOptions } from "../interfaces/common";

@injectable()
class Environment {
    protected options?: ClientOptions;
    set(options: ClientOptions) {
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
        return value;
    }

    exists(path: string) {
        return this.get(path) !== undefined;
    }
}

export default Environment;