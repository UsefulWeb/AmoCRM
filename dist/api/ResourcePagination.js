"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Постраничная навигация вывода сущностей
 * */
class ResourcePagination {
    constructor(request, params) {
        this.data = [];
        this.links = {};
        this.page = 1;
        this.request = request;
        this.params = params;
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
    refresh() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.links.current) {
                return false;
            }
            return yield this.fetchUrl(this.links.current);
        });
    }
    /**
     * Делает запрос на получение данных по заданному адресу
     * @param url адрес запроса
     * */
    fetchUrl(url) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { criteria, options } = this.params;
            const apiResponse = yield this.request.get(url, criteria, options);
            const { data } = apiResponse;
            this.page = (data === null || data === void 0 ? void 0 : data._page) || 1;
            this.parseData(data);
            this.parseLinks(data);
            this.links.current = url;
            return this.data;
        });
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
    next() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.hasNext()) {
                return false;
            }
            return yield this.fetchUrl(this.links.next);
        });
    }
    /**
     * Загружает данные первой страницы, если это возможно
     * */
    first() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.hasFirst()) {
                return false;
            }
            return yield this.fetchUrl(this.links.first);
        });
    }
    /**
     * Загружает данные предыдущей страницы, если это возможно
     * */
    prev() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.hasPrev()) {
                return false;
            }
            return yield this.fetchUrl(this.links.prev);
        });
    }
    /**
     * Обрабатывает объект ссылок на первую, предыдущую и следущие страницы
     * */
    parseLinks(response) {
        var _a, _b, _c;
        const links = (response === null || response === void 0 ? void 0 : response._links) || {};
        this.links = {
            next: (_a = links.next) === null || _a === void 0 ? void 0 : _a.href,
            prev: (_b = links.prev) === null || _b === void 0 ? void 0 : _b.href,
            first: (_c = links.first) === null || _c === void 0 ? void 0 : _c.href
        };
        return this;
    }
    /**
     * Преобразовывает массив атрибутов сущностей в объекты-сущностей
     * */
    parseData(response) {
        const { embedded, factory } = this.params;
        const data = (response === null || response === void 0 ? void 0 : response._embedded[embedded]) || [];
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
exports.default = ResourcePagination;
//# sourceMappingURL=ResourcePagination.js.map