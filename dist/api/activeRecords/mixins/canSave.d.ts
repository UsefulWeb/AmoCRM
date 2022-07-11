import { IResourceEntity } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
export declare function canSave<T extends IResourceEntity>(Base: TEntityConstructor<T>): TEntityConstructor<T>;
