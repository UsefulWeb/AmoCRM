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
    protected links: IPaginationLinks = {};
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

        this.page = data?._page || 1;
        this.parseData(data);
        this.parseLinks(data)
    }

    hasNext() {
        return Boolean(this.links.next);
    }

    hasFirst() {
        return Boolean(this.links.first);
    }

    hasPrev() {
        return Boolean(this.links.prev);
    }

    async next() {
        if (!this.hasNext()) {
            return false;
        }
        return await this.fetch(this.links.next);
    }

    async first() {
        if (!this.hasFirst()) {
            return false;
        }
        return await this.fetch(this.links.first);
    }

    async prev() {
        if (!this.hasPrev()) {
            return false;
        }
        return await this.fetch(this.links.prev);
    }

    protected parseLinks(response?: IPaginatedResponse) {
        const links = response?._links || {};
        this.links = {
            next: links.next?.href,
            prev: links.prev?.href,
            first: links.first?.href
        };
    }

    protected parseData(response?: IPaginatedResponse) {
        const { embedded, factory } = this.params;
        const data: any = response?._embedded[embedded] || [];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(attributes => {
            const item = factory.create(attributes);
            return item;
        });
    }

    getPage() {
        return this.page;
    }

    getData() {
        return this.data;
    }
}