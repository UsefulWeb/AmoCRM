import {IRequestOptions} from "../../../interfaces/common";
import {IHasLinkedEntity} from "../mixins/hasLinkedEntity";
import {IHasGetByIdCriteria, IHasGetByIdFactory} from "../../factories/mixins/hasGetById";
import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";

export interface ILinkedEntityOptions<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
> {
    entity: IHasLinkedEntity<T, L>;
}

export interface ILinkedEntity<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
> {
    get<TL extends IResourceEntity<IResourceFactory<TL>> = IResourceEntity<L>>
    (criteria?: IHasGetByIdCriteria, options?: IRequestOptions): Promise<TL|null>;
}

export class LinkedEntity<
    T extends IResourceFactory<IResourceEntity<T>>,
    L extends IHasGetByIdFactory<IResourceEntity<L>>
> implements ILinkedEntity<T, L> {
    readonly entity: IHasLinkedEntity<T, L>;

    constructor(options: ILinkedEntityOptions<T, L>) {
        const { entity } = options;
        this.entity = entity;
    }

    get<TL extends IResourceEntity<IResourceFactory<TL>> = IResourceEntity<L>>
    (criteria?: IHasGetByIdCriteria, options?: IRequestOptions){
        const { entity } = this;
        const { entity_type, entity_id } = entity;
        if (!entity_type || !entity_id) {
            return Promise.resolve(null);
        }
        const entityFactory = entity.getFactory(); // tasks
        const client = entityFactory.getClient();
        const factoryConstructors = client.getFactoryConstructors();
        const Constructor = factoryConstructors[entity_type];
        const factory = new Constructor(client) as never as IHasGetByIdFactory<TL>;

        return factory.getById(entity_id, criteria, options);
    }
}