import entities  from "../api/activeRecords";
import factories  from "../api/factories";
import { TClientPlugin } from "../types";
import { IClientConstructors } from "../interfaces/api";

export class ConstructorBuilder {
    static getBaseConstructors(): IClientConstructors {
        return {
            factories,
            entities
        };
    }
    static applyPlugins(plugins: TClientPlugin[] = []): IClientConstructors {
        let constructors = this.getBaseConstructors();
        for (const plugin of plugins) {
            constructors = plugin(constructors);
        }
        return constructors;
    }
}