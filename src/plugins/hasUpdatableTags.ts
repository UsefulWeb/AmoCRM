import { applyMixins } from "../util";
import { hasUpdatableTags as factoryHasUpdatableTags } from "./factories/hasUpdatableTags";
import { IClientConstructors } from "../interfaces/api";

export function hasUpdatableTags(constructors: IClientConstructors): IClientConstructors {
    const mixins = [factoryHasUpdatableTags];
    const factories = {
        ...constructors.factories,
        leads: applyMixins(constructors.factories.leads, mixins),
        contacts: applyMixins(constructors.factories.contacts, mixins),
        companies: applyMixins(constructors.factories.companies, mixins),
        customers: applyMixins(constructors.factories.customers, mixins),
    };
    return {
        ...constructors,
        factories
    };
}