import { IClientRequest } from "../common/ClientRequest";
import {
    IEntityAttributes,
    IPaginatedResponse,
    IPaginationLinks, IResourceEntity, IResourceFactory,
    IResourcePaginationParams
} from "../interfaces/api";

export interface IResourcePagination<T> {
    fetch(): void;
    getData(): T[];
    getPage(): number;
    next(): Promise<boolean|T[]>;
    prev(): Promise<boolean|T[]>;
    [Symbol.iterator](): Iterator<T>;
}

/**
 * Постраничная навигация вывода сущностей
 * */
export default class ResourcePagination<T extends IResourceEntity<IResourceFactory<T>>> implements IResourcePagination<T> {
    protected readonly request: IClientRequest;
    protected readonly params: IResourcePaginationParams<T>;
    protected data: T[] = [];
    protected links: IPaginationLinks = {};
    protected page = 1;

    constructor(request: IClientRequest, params: IResourcePaginationParams<T>) {
        this.request = request;
        this.params = params;
    }

    [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
    }

    /**
     * Загружает данные первой страницы
     * */
    fetch() {
        return this.fetchUrl(this.params.url);
    }

    /**
     * Обновляет данные на текущей странице
     * */
    async refresh() {
        if (!this.links.current) {
            return false;
        }
        return await this.fetchUrl(this.links.current);
    }

    /**
     * Делает запрос на получение данных по заданному адресу
     * @param url адрес запроса
     * */
    protected async fetchUrl(url: string) {
        const { criteria, options } = this.params;
        const apiResponse = await this.request.get<IPaginatedResponse>(url, criteria, options);
        const { data } = apiResponse;
        this.page = data?._page || 1;
        this.parseData(data);
        this.parseLinks(data);
        this.links.current = url;
        return this.data;
    }

    /**
     * @returns есть ли следующая страница
     * */
    hasNext() {
        return this.links.next !== undefined;
    }

    /**
     * @returns есть ли возможность загрузки первой страницы
     * */
    hasFirst() {
        return this.links.first !== undefined;
    }

    /**
     * @returns есть ли предыдущая страница
     * */
    hasPrev() {
        return this.links.prev !== undefined;
    }

    /**
     * Загружает данные следующей страницы, если это возможно
     * */
    async next() {
        if (!this.hasNext()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.next);
    }

    /**
     * Загружает данные первой страницы, если это возможно
     * */
    async first() {
        if (!this.hasFirst()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.first);
    }

    /**
     * Загружает данные предыдущей страницы, если это возможно
     * */
    async prev() {
        if (!this.hasPrev()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.prev);
    }

    /**
     * Обрабатывает объект ссылок на первую, предыдущую и следущие страницы
     * */
    protected parseLinks(response?: IPaginatedResponse) {
        const links = response?._links || {};
        this.links = {
            next: links.next?.href,
            prev: links.prev?.href,
            first: links.first?.href
        };
        return this;
    }

    /**
     * Преобразовывает массив атрибутов сущностей в объекты-сущностей
     * */
    protected parseData(response?: IPaginatedResponse) {
        const { embedded, factory } = this.params;
        const data: IEntityAttributes[] | undefined = <IEntityAttributes[] | undefined>response?._embedded[embedded] || [];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(attributes => {
            return factory.from(attributes);
        });
        return this;
    }

    /**
     * Возвращает номер текущей страницы
     * */
    getPage() {
        return this.page;
    }

    /**
     * Возвращает массив сущностей на текущей странице
     * */
    getData() {
        return this.data;
    }
}