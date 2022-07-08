import { TFactoryConstructor } from "../../../types";
import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
export interface CreateResult {
    id: number;
    request_id: string;
}
export declare function canCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T>;
