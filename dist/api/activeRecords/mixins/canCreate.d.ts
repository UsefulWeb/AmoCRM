import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { IGetByIdCriteria } from "../../factories/mixins/canGetById";
import { ICanCreateFactory } from "../../factories/mixins/canCreate";
export interface ICreateResult {
    id: number;
    request_id: string;
}
export interface ICanCreateEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T> {
    create(criteria?: IGetByIdCriteria, options?: IRequestOptions<T>): Promise<T | false | null>;
}
export declare function canCreate<T extends ICanCreateFactory<IResourceEntity<T>>>(Base: TEntityConstructor<T>): TEntityConstructor<T>;
