import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";

export interface IHasEmbedded<E>{
    _embedded?: E;
    getEmbedded(): E;
    setEmbedded(patch: E): void;
}

export type IHasEmbeddedEntity<T extends IResourceFactory<IResourceEntity<T>>, E> =
    IResourceEntity<T> & IHasEmbedded<E>;

export function hasEmbedded<T extends IHasCreateFactory<IResourceEntity<T>>, E>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>> {
    return class HasEmbedded extends Base implements IHasEmbedded<E> {
        public _embedded?: E;

        getEmbedded(): E {
            if (this._embedded) {
                return this._embedded;
            }
            return {} as E;
        }

        setEmbedded(patch: E): void {
            const embedded = this.getEmbedded();

            this._embedded = {
                ...embedded,
                ...patch
            };
        }

    };
}