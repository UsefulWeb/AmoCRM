import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanGetByIdFactory, IGetByIdCriteria } from "../../factories/mixins/canGetById";
export interface ICanUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    update(criteria?: IGetByIdCriteria, options?: IRequestOptions<T>): Promise<T | false | null>;
}
export declare function canUpdate<T extends ICanGetByIdFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T>;
