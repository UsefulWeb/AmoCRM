import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface IGetByIdCriteria {
    with?: string;
}
export declare function canGetById<T extends IResourceEntity>(factory: IResourceFactory<T>): (identity: number, criteria?: IGetByIdCriteria | undefined, options?: IRequestOptions<IEntityAttributes> | undefined) => Promise<T | null>;
