import {IHasGetFactory} from "../../factories/mixins/hasGetByCriteria";
import {IResourceEntity, IResourceFactory} from "../../../interfaces/api";
import {IHasCreateFactory} from "../../factories/mixins/hasCreate";
import {IFactoryCriteriaItem} from "../../factories/common/FactoryCriteriaBuilder";

export interface IEntityList<T extends IResourceEntity<IResourceFactory<T>>>  {
    get: IHasGetFactory<T>['get'];
    create: IHasCreateFactory<T>['create'];
}

export type IEntityListRequiredFactory<T extends IResourceEntity<IResourceFactory<T>>> =
    IHasGetFactory<T> &
    IHasCreateFactory<T>;

export interface IEntityListOptions<T extends IResourceEntity<IResourceFactory<T>>> {
    factory: IEntityListRequiredFactory<T>;
}

export class EntityList<T extends IResourceEntity<IResourceFactory<T>>> implements IEntityList<T> {
    public readonly get: IHasGetFactory<T>['get'];
    public readonly create: IHasCreateFactory<T>['create'];

    constructor(options: IEntityListOptions<T>) {
        const { factory } = options;

        this.get = factory.get.bind(factory);
        this.create = factory.create.bind(factory);
    }
}