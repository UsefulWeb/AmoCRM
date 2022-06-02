import ClientRequest from "../common/ClientRequest";
import { IPaginatedResponse, IPaginationLinks, IResourcePagination, IResourcePaginationParams } from "../interfaces/api";
export default class ResourcePagination<T> implements IResourcePagination<T> {
    protected readonly request: ClientRequest;
    protected readonly params: IResourcePaginationParams<T>;
    protected data: T[];
    protected links: IPaginationLinks;
    protected page: number;
    constructor(request: ClientRequest, params: IResourcePaginationParams<T>);
    fetch(url?: string): Promise<void>;
    hasNext(): boolean;
    hasFirst(): boolean;
    hasPrev(): boolean;
    next(): Promise<false | void>;
    first(): Promise<false | void>;
    prev(): Promise<false | void>;
    protected parseLinks(response?: IPaginatedResponse): void;
    protected parseData(response?: IPaginatedResponse): void;
    getPage(): number;
    getData(): T[];
}
