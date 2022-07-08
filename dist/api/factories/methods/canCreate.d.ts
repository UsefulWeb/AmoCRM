import { ICollectionResponse, IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
export interface CreateResult {
    id: number;
    request_id: string;
}
export declare function canCreate<T extends IResourceEntity>(factory: IResourceFactory<T>): <A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions<ICollectionResponse<CreateResult>> | undefined) => Promise<T[]>;
