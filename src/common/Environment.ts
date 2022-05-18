import { injectable } from "inversify";
import { ClientOptions } from "../interfaces/common";

@injectable()
class Environment {
    protected options: ClientOptions | undefined;
    set(options: ClientOptions) {
        this.options = options;
    }
    get(path?: string, defaultValue?: any): any {
        if (!path) {
            return this.options;
        }
        let value: any = this.options;
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