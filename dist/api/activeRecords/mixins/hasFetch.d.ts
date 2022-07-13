import { IResourceEntity } from "../../../interfaces/api";
import { TConstructor, TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IHasGetByIdCriteria } from "../../factories/mixins/hasGetById";
export interface IHasFetchEntity<T extends ICanGetByIdFactory<IResourceEntity<T>>> {
    fetch(criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<IHasFetchEntity<T> | false | null>;
}
export declare function hasFetch<T extends ICanGetByIdFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TConstructor<IResourceEntity<T>>;
