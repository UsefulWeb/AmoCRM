import {
    IEmbedded,
    IEmbeddedEntity,
    IResourceEntity,
    IResourceFactory
} from "../../../interfaces/api";
import {ObjectKey} from "../../../interfaces/common";
import {ICriteriaItem} from "./CriteriaBuilder";
import {IHasEmbeddedEntity} from "../mixins/hasEmbedded";

export interface IEmbeddedEntityList<E extends IEmbeddedEntity> extends ICriteriaItem {
    length: number;
    add(criteria: E[]): void;
    set(value: E[]|null): void;
    get(): E[];
    remove(value?: E[]): void;
}

export type IHasTypedEmbeddedEntity<T extends IResourceFactory<IResourceEntity<T>>, E> =
    IHasEmbeddedEntity<T, IEmbedded<E>>;

export interface IQueryAttributes<E extends IEmbeddedEntity> {
    save?: ObjectKey<E>[];
    create?: ObjectKey<E>[];
    update?: ObjectKey<E>[];
}

export interface IEmbeddedEntityListOptions<T extends IResourceFactory<IResourceEntity<T>>, E extends IEmbeddedEntity> {
    entity: IHasTypedEmbeddedEntity<T, E>;
    embeddedType: ObjectKey<IEmbedded<E>>;
    attributes?: IQueryAttributes<E>;
}

export class EmbeddedEntityList<T extends IResourceFactory<IHasTypedEmbeddedEntity<T, E>>, E extends IEmbeddedEntity> implements IEmbeddedEntityList<E> {
    protected entity: IHasTypedEmbeddedEntity<T, E>;
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
        const patch = <IEmbedded<E>>{
            [this.embeddedType]: value
        };
        this.entity.setEmbedded(patch);
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
        const readonly = attributes === undefined;
        if (readonly) {
            return {};
        }

        const value = this.get().map(
            item => this.pickItemAttributes(item, attributes)
        );

        return {
            _embedded: {
                [this.embeddedType]: value
            }
        };
    }

    protected pickItemAttributes(item: E, attributes?: ObjectKey<E>[]) {
        if (!attributes) {
            return item;
        }
        type Target = {
            [P in ObjectKey<E>]?: E[P];
        };
        const target: Target = {};
        return attributes.reduce((target: Target, key) => {
            target[key] = item[key];
            return target;
        }, target);
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