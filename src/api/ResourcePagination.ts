import ClientRequest from "../common/ClientRequest";
import {
    IPaginatedResponse,
    IPaginationLinks,
    IResourcePagination,
    IResourcePaginationParams
} from "../interfaces/api";

export default class ResourcePagination<T> implements IResourcePagination<T> {
    protected readonly request: ClientRequest;
    protected readonly params: IResourcePaginationParams<T>;
    protected data: T[] = [];
    protected links?: IPaginationLinks;
    protected page = 1;

    constructor(request: ClientRequest, params: IResourcePaginationParams<T>) {
        this.request = request;
        this.params = params;
    }

    async fetch(url?: string) {
        if (!url) {
            url = this.params.url;
        }
        const { criteria } = this.params;
        const apiResponse = await this.request.get(url, criteria);
        const data: IPaginatedResponse = apiResponse.data;

        this.page = data._page;
        this.parseData(data);
        this.parseLinks(data)
    }

    next() {
        return this.fetch(this.links?.next);
    }

    first() {
        return this.fetch(this.links?.first);
    }

    prev() {
        return this.fetch(this.links?.prev);
    }

    protected parseLinks(response: IPaginatedResponse) {
        const links = response._links;
        this.links = {
            next: links.next.href,
            prev: links.prev.href,
            first: links.first.href
        };
    }

    protected parseData(response: IPaginatedResponse) {
        const { embedded, factory } = this.params;
        const data: any = response._embedded[embedded];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(attributes => factory.create(attributes));
    }

    getPage() {
        return this.page;
    }

    getData() {
        return this.data;
    }
}