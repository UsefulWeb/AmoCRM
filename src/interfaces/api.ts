import ClientRequest from "../common/ClientRequest";
import { JSONObject } from "../types";
import { IRequestOptions } from "./common";

export interface IResourceFactory<T> {
    createEntity(): IResourceEntity;
    from(attributes?: JSONObject): T;
}

export interface IResourceEntity {
    setAttributes(attributes?: JSONObject): void;
}

export interface IResourceEntityConstructor<T> {
    from(request: ClientRequest, attributes?: JSONObject): T;
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

export interface IResourcePaginationParams<T> {
    url: string;
    criteria?: object;
    factory: IResourceFactory<T>;
    embedded: string;
    options?: IRequestOptions;
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
    _embedded: JSONObject;
}

export type IEntityConstructor<T> = (attributes?: JSONObject) => T;

