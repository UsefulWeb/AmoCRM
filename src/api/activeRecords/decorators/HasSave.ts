import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";
import { IHasUpdateFactory } from "../../factories/mixins/hasUpdate";
import { IHasCreateEntity } from "./HasCreate";
import { IHasUpdateEntity } from "./HasUpdate";

export type IHasCreateAndUpdateFactory<T extends IResourceEntity<IResourceFactory<T>>> = IHasCreateFactory<T> & IHasUpdateFactory<T>;

export type IHasCreateAndUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> = IHasCreateEntity<T> & IHasUpdateEntity<T>;

export interface IHasSaveEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T>, IHasCreateAndUpdateEntity<T> {
    save(options?: IRequestOptions): Promise<T|false>;
}

export type THasCreateAndUpdateEntityConstructor<T extends IHasCreateAndUpdateFactory<IResourceEntity<T>>> =
    TConstructor<IHasCreateAndUpdateEntity<T>>

export function HasSave<
        T extends THasCreateAndUpdateEntityConstructor<F>,
        F extends IHasCreateAndUpdateFactory<IHasCreateAndUpdateEntity<F>>
    >
(Base: T) {
    return class HasSave extends Base {
        save(options?: IRequestOptions) {
            if (this.isNew()) {
                return this.create(options);
            }
            return this.update(options);
        }
    };
}