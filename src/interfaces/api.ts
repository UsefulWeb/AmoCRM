import { IClientRequest } from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IRequestOptions } from "./common";
import { IEventEmitter } from "../common/EventEmitter";

export interface IResourceFactory<T extends IResourceEntity> extends IEventEmitter {
    createEntity(): IResourceEntity;
    from(attributes?: IEntityAttributes): T;
    getRequest(): IClientRequest;
    getEmbedded(): string;
    getUrl(path?: string): string;
    getEntityCriteria(criteriaData: (object)[]): IEntityAttributes[];
}

export interface IResourceEntity {
    id?: number;
    updated_at?: number;
    setAttributes(attributes?: IEntityAttributes): void;
}

export interface IResourceEntityConstructor<T> {
    from(request: IClientRequest, attributes?: JSONObject): T;
}

export interface ICollectionResponse<T> {
    _links: {
        href: string
    }
    _embedded: {
        [index: string]: T[]
    };
}

export interface IResourcePagination<T> {
    fetch(): void;
    getData(): T[];
}

export interface IPaginationLinks {
    current?: string;
    next?: string;
    prev?: string;
    first?: string;
}

export interface IResourcePaginationParams<T extends IResourceEntity> {
    url: string;
    criteria?: object;
    factory: IResourceFactory<T>;
    embedded: string;
    options?: IRequestOptions<IPaginatedResponse>;
}

export interface ILinkResponse {
    href: string
}

export interface IPaginatedResponse {
    _page: number;
    _links: {
        self?: ILinkResponse;
        next?: ILinkResponse;
        first?: ILinkResponse;
        prev?: ILinkResponse;
    }
    _embedded: {
        [index: string]: IEntityAttributes[]
    };
}

export interface IEntityAttributes {
    id?: number;
}

export type IEntityConstructor<T> = (attributes?: JSONObject) => T;

