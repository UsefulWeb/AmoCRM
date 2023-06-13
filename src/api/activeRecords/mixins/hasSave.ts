import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IHasCreateFactory } from "../../factories/mixins/hasCreate";
import { IHasUpdateFactory } from "../../factories/mixins/hasUpdate";
import {IHasCreate, IHasCreateEntity} from "./hasCreate";
import {IHasUpdate, IHasUpdateEntity} from "./hasUpdate";

export type IHasCreateAndUpdateFactory<T extends IResourceEntity<IResourceFactory<T>>> = IHasCreateFactory<T> & IHasUpdateFactory<T>;

export type IHasCreateAndUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> = IHasCreateEntity<T> & IHasUpdateEntity<T>;

export interface IHasSave<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> extends IHasCreate<T>, IHasUpdate<T> {
    save(options?: IRequestOptions): Promise<IResourceEntity<T>>;
}

export type IHasSaveEntity<T extends IResourceFactory<IHasCreateAndUpdateEntity<T>>> = IResourceEntity<T> &
    IHasCreate<T> &
    IHasUpdate<T> &
    IHasSave<T>;

export function hasSave<T extends IHasCreateAndUpdateFactory<IHasCreateAndUpdateEntity<T>>>
    (Base: TConstructor<IHasCreateAndUpdateEntity<T>>): TConstructor<IResourceEntity<T>>
{
    return class HasSave extends Base implements IHasSave<T> {
        save(options?: IRequestOptions) {
            if (this.isNew()) {
                return this.create(options);
            }
            return this.update(options);
        }
    };
}