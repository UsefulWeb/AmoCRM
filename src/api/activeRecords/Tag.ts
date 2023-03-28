/**
 * Сделка (сущность)
 */
import ResourceEntity from "../ResourceEntity";
import { TConstructor } from "../../types";
import { IRequestOptions } from "../../interfaces/common";
import { IEntityAttributes, IResourceEntity } from "../../interfaces/api";
import { applyMixins } from "../../util";
import { hasCreate } from "./mixins/hasCreate";
import { IHasGetByIdCriteria } from "../factories/mixins/hasGetById";
import { ITagFactory } from "../factories/TagFactory";

export type TagColor =
    'EBEBEB' | 'D0D0D0' | 'F2DDF7' | 'D1A4DC' | 'FF8F92' |
    'FFC8C8' | 'C7DB8C' | 'DDEBB5' | '8699DA' | 'AABDFF' |
    'FFCE5A' | 'FFE193' | '90CDB0' | 'C6F4DE' | 'A9A5D7' |
    'D8D5FF' | '86C0FC' | '832161' | '6A0F49' | '0C7C59' |
    '10599D' | '9D2B32' | '247BA0';

export interface TagAttributes extends IEntityAttributes {
    id?: number;
    name?: string;
    color?: TagColor;
}
export interface IEmbeddedTag {
    id?: number;
    name?: string;
    color?: TagColor;
}

export interface IHasEmbeddedTags {
    tags?: IEmbeddedTag[];
}

export interface ITag extends IResourceEntity<ITagFactory>, TagAttributes {
}

/**
 * Сделка
 */
export class BaseTag extends ResourceEntity<ITagFactory> {
    id?: number;
    name?: string;
    color?: TagColor;

    getAttributes(): TagAttributes {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
        };
    }

    setAttributes(attributes: TagAttributes = {}): void {
        this.id = attributes.id;
        this.name = attributes.name;
        this.color = attributes.color;
    }
}

export const mixins = [];

export const Tag: TConstructor<ITag> = applyMixins(BaseTag, mixins);