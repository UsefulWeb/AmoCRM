"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const qs = tslib_1.__importStar(require("qs"));
const https = tslib_1.__importStar(require("https"));
const enums_1 = require("../enums");
const EventEmitter_1 = require("./EventEmitter");
const JSONResponseParser_1 = tslib_1.__importDefault(require("./JSONResponseParser"));
/**
 * Класс запросов к порталу AmoCRM
 * */
class DomainRequest extends EventEmitter_1.EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.hostname = this.getHostname();
    }
    isFormData() {
        const { options } = this.config;
        if (options === null || options === void 0 ? void 0 : options.useFormData) {
            return true;
        }
        return false;
    }
    getHeaders() {
        var _a;
        const baseHeaders = ((_a = this.config.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
        const { token, method } = this.config;
        const clientHeaders = {};
        if (token) {
            clientHeaders['Authorization'] = 'Bearer ' + token.access_token;
        }
        if (this.isFormData()) {
            clientHeaders['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        else if (method !== enums_1.HttpMethod.GET) {
            clientHeaders['Content-Type'] = 'application/json';
        }
        return Object.assign(Object.assign({}, baseHeaders), clientHeaders);
    }
    getMethod() {
        return this.config.method;
    }
    getData() {
        const { data, method } = this.config;
        if (method === enums_1.HttpMethod.GET) {
            return;
        }
        if (this.isFormData()) {
            return qs.stringify(data);
        }
        return JSON.stringify(data);
    }
    getLocation() {
        const { url } = this.config;
        const re = /^https?:\/\//i;
        if (!re.test(url)) {
            const fullURL = `https://${this.hostname}${url}`;
            return new URL(fullURL);
        }
        return new URL(url);
    }
    getPath() {
        const { method, data, url } = this.config;
        if (method !== enums_1.HttpMethod.GET) {
            return url;
        }
        const location = this.getLocation();
        const path = location.pathname;
        const queryStringData = Object.fromEntries(location.searchParams);
        const mergedData = Object.assign(Object.assign({}, data), queryStringData);
        const queryString = qs.stringify(mergedData);
        if (!queryString) {
            return path;
        }
        return path + '?' + queryString;
    }
    getHostname() {
        const { domain } = this.config;
        if (domain.includes('.')) {
            return domain;
        }
        return domain + '.amocrm.ru';
    }
    process() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const apiResponse = yield this.makeRequest();
            return this.parseResponse(apiResponse);
        });
    }
    parseResponse(apiResponse) {
        const { options = {} } = this.config;
        const { parser = new JSONResponseParser_1.default } = options;
        return parser.parse(apiResponse);
    }
    makeRequest() {
        const path = this.getPath();
        const headers = this.getHeaders();
        const data = this.getData();
        const method = this.getMethod();
        const hostname = this.hostname;
        const options = {
            hostname,
            path,
            method,
            headers
        };
        const onResponse = this.onResponse.bind(this);
        return new Promise((resolve, reject) => {
            const request = https.request(options, onResponse(resolve));
            if (method !== enums_1.HttpMethod.GET && data) {
                request.write(data);
            }
            request.on('error', this.onError(reject));
            request.end();
        });
    }
    onResponse(callback) {
        const buffer = [];
        const onResponseData = (chunk) => buffer.push(chunk);
        const onResponseEnd = (response) => () => {
            const data = buffer.join('');
            const result = {
                response,
                data
            };
            return callback(result);
        };
        return (response) => {
            response.on('data', onResponseData);
            response.on('end', onResponseEnd(response));
        };
    }
    onError(callback) {
        return (error) => callback(error);
    }
}
exports.default = DomainRequest;
//# sourceMappingURL=DomainRequest.js.map