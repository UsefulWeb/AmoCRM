import { injectable } from "inversify";
import { ClientOptions } from "./interfaces/common";

@injectable()
class Environment {
    protected options: ClientOptions | undefined;
    set(options: ClientOptions) {
        this.options = options;
    }
    get() {
        return this.options;
    }
}

export default Environment;