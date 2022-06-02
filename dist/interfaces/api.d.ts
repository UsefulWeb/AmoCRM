import { JSONObject } from "../types";
export interface IResourceFactory<T> {
    create(attributes?: JSONObject): T;
}
export interface IResourceEntity {
}
export interface IResourcePagination<T> {
    fetch(): void;
    getData(): T[];
}
export interface IPaginationLinks {
    next?: string;
    prev?: string;
    first?: string;
}
export interface IResourcePaginationParams<T> {
    url: string;
    criteria: object;
    factory: IResourceFactory<T>;
    embedded: string;
}
export interface ILinkResponse {
    href: string;
}
export interface IPaginatedResponse {
    _page: number;
    _links: {
        self?: ILinkResponse;
        next?: ILinkResponse;
        first?: ILinkResponse;
        prev?: ILinkResponse;
    };
    _embedded: JSONObject;
}
export declare type IEntityConstructor<T> = (attributes?: JSONObject) => T;
