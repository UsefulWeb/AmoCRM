import ClientRequest from "../common/ClientRequest";
import { IPaginatedResponse, IPaginationLinks, IResourcePagination, IResourcePaginationParams } from "../interfaces/api";
export default class ResourcePagination<T> implements IResourcePagination<T> {
    protected readonly request: ClientRequest;
    protected readonly params: IResourcePaginationParams<T>;
    protected data: T[];
    protected links?: IPaginationLinks;
    protected page: number;
    constructor(request: ClientRequest, params: IResourcePaginationParams<T>);
    fetch(url?: string): Promise<void>;
    next(): Promise<void>;
    first(): Promise<void>;
    prev(): Promise<void>;
    protected parseLinks(response: IPaginatedResponse): void;
    protected parseData(response: IPaginatedResponse): void;
    getPage(): number;
    getData(): T[];
}
