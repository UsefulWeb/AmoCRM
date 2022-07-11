import { IResourceEntity } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IGetByIdCriteria } from "../../factories/mixins/canGetById";
export interface ICanFetchEntity<T extends ICanGetByIdFactory<IResourceEntity<T>>> {
    fetch(criteria?: IGetByIdCriteria, options?: IRequestOptions<ICanFetchEntity<T>>): Promise<ICanFetchEntity<T> | false | null>;
}
export declare function canFetch<T extends ICanGetByIdFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T>;
