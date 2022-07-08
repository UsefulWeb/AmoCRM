import { TFactoryConstructor } from "../../../types";
import {
    ICollectionResponse, IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";
import ResourceEntity from "../../ResourceEntity";

export interface UpdateResult {
    id: number;
    updated_at: number;
    request_id: string;
}

export interface IEntityUpdateAttributes extends IEntityAttributes {
    updated_at?: number;
}

export function canUpdate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class CanUpdate extends Base implements IResourceFactory<T> {
        async update<A extends IEntityUpdateAttributes>
            (criteria: (object | T)[], options?: IRequestOptions<ICollectionResponse<UpdateResult>>): Promise<T[]>
        {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = await this.getRequest().patch(url, requestCriteria, options);
            const response = this.getEmbedded(data);

            const result = response.map((attributes, index: number) => {
                const entityCriteria = criteria[index];
                const instance = entityCriteria instanceof this.getEntityClass() ?
                    entityCriteria :
                    this.from(entityCriteria);
                instance.id = attributes.id;
                instance.updated_at = attributes.updated_at;
                return instance;
            });
            this.emit('update');
            return result;
        }
    };
}