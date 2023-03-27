import { pick } from 'lodash';
import {
    IEmbedded,
    IEmbeddedEntity,
    IResourceEntity,
    IResourceEntityWithEmbedded,
    IResourceFactory
} from "../../../interfaces/api";
import {ObjectKey} from "../../../interfaces/common";
import {ICriteriaItem} from "./CriteriaBuilder";

export interface IEmbeddedEntityList<E extends IEmbeddedEntity> extends ICriteriaItem {
    length: number;
    add(criteria: object[]): void;
    set(value: E[]|null): void;
    get(): E[];
    remove(value?: E[]): void;
}

export interface IQueryAttributes<E extends IEmbeddedEntity> {
    save?: ObjectKey<E>[];
    create?: ObjectKey<E>[];
    update?: ObjectKey<E>[];
}

export interface IEmbeddedEntityListOptions<T extends IResourceFactory<IResourceEntity<T>>, E extends IEmbeddedEntity> {
    entity: IResourceEntityWithEmbedded<T, E>;
    embeddedType: ObjectKey<IEmbedded<E>>;
    attributes?: IQueryAttributes<E>;
}

export class EmbeddedEntityList<T extends IResourceFactory<IResourceEntityWithEmbedded<T, E>>, E extends IEmbeddedEntity> implements IEmbeddedEntityList<E> {
    protected entity: IResourceEntityWithEmbedded<T, E>;
    protected embeddedType: ObjectKey<IEmbedded<E>>;
    protected attributes?: IQueryAttributes<E>;
    constructor(options: IEmbeddedEntityListOptions<T, E>) {
        this.entity = options.entity;
        this.embeddedType = options.embeddedType;
        this.attributes = options.attributes;
    }

    add(criteria: object[]) {
        const factory = this.entity.getFactory();
        const entityCriteria = factory.getEntityCriteria(criteria);

        this.set(entityCriteria);
    }

    set(value: IEmbeddedEntity[]|null) {
        const embedded = this.entity.getEmbedded();
        this.entity.setEmbedded({
            ...embedded,
            [this.embeddedType]: value
        });
    }

    get length() {
        return this.get().length;
    }

    get(): E[] {
        const _embedded = this.entity.getEmbedded();
        const value = _embedded[this.embeddedType];
        return value || [];
    }

    remove(value?: IEmbeddedEntity[]) {
        if (!value) {
            return this.set(null);
        }
        const ids = value
            .map(({ id }) => id);

        const rest = this.get().filter(item => {
            const { id } = item;
            if (!id) {
                return false;
            }
            return !ids.includes(id);
        });

        this.set(rest);
    }

    getEmbeddedSaveCriteria(attributes?: ObjectKey<E>[]) {
        const value = this.get().map(
            item => attributes ? pick(item, attributes) : item
        );

        return {
            _embedded: {
                [this.embeddedType]: value
            }
        };
    }

    getCreateCriteria() {
        const attributes = this.attributes?.create || this.attributes?.save;
        return this.getEmbeddedSaveCriteria(attributes);
    }

    getUpdateCriteria() {
        const attributes = this.attributes?.update || this.attributes?.save;
        return this.getEmbeddedSaveCriteria(attributes);
    }
}