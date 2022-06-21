import ClientRequest from "../common/ClientRequest";
import { IEntityAttributes, IPaginatedResponse, IPaginationLinks, IResourcePagination, IResourcePaginationParams } from "../interfaces/api";
/**
 * Постраничная навигация вывода сущностей
 * */
export default class ResourcePagination<T, R extends IEntityAttributes> implements IResourcePagination<T> {
    protected readonly request: ClientRequest;
    protected readonly params: IResourcePaginationParams<T, R>;
    protected data: T[];
    protected links: IPaginationLinks;
    protected page: number;
    constructor(request: ClientRequest, params: IResourcePaginationParams<T, R>);
    /**
     * Загружает данные первой страницы
     * */
    fetch(): Promise<T[]>;
    /**
     * Обновляет данные на текущей странице
     * */
    refresh(): Promise<false | T[]>;
    /**
     * Делает запрос на получение данных по заданному адресу
     * @param url адрес запроса
     * */
    protected fetchUrl(url: string): Promise<T[]>;
    /**
     * @returns есть ли следующая страница
     * */
    hasNext(): boolean;
    /**
     * @returns есть ли возможность загрузки первой страницы
     * */
    hasFirst(): boolean;
    /**
     * @returns есть ли предыдущая страница
     * */
    hasPrev(): boolean;
    /**
     * Загружает данные следующей страницы, если это возможно
     * */
    next(): Promise<false | T[]>;
    /**
     * Загружает данные первой страницы, если это возможно
     * */
    first(): Promise<false | T[]>;
    /**
     * Загружает данные предыдущей страницы, если это возможно
     * */
    prev(): Promise<false | T[]>;
    /**
     * Обрабатывает объект ссылок на первую, предыдущую и следущие страницы
     * */
    protected parseLinks(response?: IPaginatedResponse<R>): this;
    /**
     * Преобразовывает массив атрибутов сущностей в объекты-сущностей
     * */
    protected parseData(response?: IPaginatedResponse<R>): this | undefined;
    /**
     * Возвращает номер текущей страницы
     * */
    getPage(): number;
    /**
     * Возвращает массив сущностей на текущей странице
     * */
    getData(): T[];
}
