import { TFactoryConstructor } from "../../../types";
import {
    ICollectionResponse, IEntityAttributes,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";

export interface CreateResult {
    id: number;
    request_id: string;
}

export function canCreate<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class CanCreate extends Base {
        async create<A extends IEntityAttributes>(criteria: (object | A)[], options?: IRequestOptions<ICollectionResponse<CreateResult>>) {
            const url = this.getUrl();
            const requestCriteria = this.getEntityCriteria(criteria);
            const { data } = await this.getRequest().post(url, requestCriteria, options);
            const response = this.getEmbedded(data);

            const result = response.map((attributes, index: number) => {
                const entityCriteria = criteria[index];
                const instance = entityCriteria instanceof this.getEntityClass() ?
                    entityCriteria :
                    this.from(entityCriteria);
                instance.id = attributes.id;
                return instance;
            });
            this.emit('create');
            return result;
        }
    };
}