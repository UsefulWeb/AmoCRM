import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import {ObjectKey} from "../../../interfaces/common";
import {IFactoryConstructors} from "../index";

export interface IGetEntityFactoryOptions<T extends IResourceEntity<IResourceFactory<T>>> {
    factory: IResourceFactory<T>,
    type: ObjectKey<IFactoryConstructors>
}

export function getEntityFactory<T extends IResourceEntity<IResourceFactory<T>>>(options: IGetEntityFactoryOptions<T>) {
    const {factory, type} = options;
    const entityType = factory.getEmbeddedKey();
    const client = factory.getClient();
    const constructors = client.getFactoryConstructors();
    const factoryConstructor = constructors[type];
    return new factoryConstructor(client, entityType);
}