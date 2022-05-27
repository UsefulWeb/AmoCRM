"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var v4_1 = tslib_1.__importDefault(require("../schema/v4"));
var DomainRequest_1 = tslib_1.__importDefault(require("./DomainRequest"));
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token(environment, auth) {
        var _this = _super.call(this) || this;
        _this.environment = environment;
        _this.auth = auth;
        return _this;
    }
    Token.prototype.isExpired = function () {
        var now = new Date;
        if (this.expiresAt === undefined) {
            return false;
        }
        return now > this.expiresAt;
    };
    Token.prototype.exists = function () {
        return this.value !== undefined;
    };
    Token.prototype.setValue = function (value) {
        this.emit('beforeChange', value);
        this.value = value;
        if (!value) {
            delete this.expiresAt;
        }
        else {
            var expiresAt = value.expires_at;
            if (!expiresAt) {
                var now = new Date;
                expiresAt = now.valueOf() + value.expires_in * 1000;
            }
            this.expiresAt = new Date(expiresAt);
        }
        this.emit('change', value);
    };
    Token.prototype.getValue = function () {
        return this.value;
    };
    Token.prototype.getBaseClientOptions = function () {
        var auth = this.environment.get('auth');
        if (!auth) {
            throw new Error('NO_AUTH_OPTIONS');
        }
        var client_id = auth.client_id, client_secret = auth.client_secret, redirect_uri = auth.redirect_uri;
        return {
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri
        };
    };
    Token.prototype.fetch = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseClientOptions, code, data, response, tokenResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emit('beforeFetch');
                        baseClientOptions = this.getBaseClientOptions();
                        code = this.auth.getCode();
                        if (!code) {
                            throw new Error('NO_AUTH_CODE');
                        }
                        data = tslib_1.__assign(tslib_1.__assign({}, baseClientOptions), { code: code, grant_type: 'authorization_code' });
                        return [4 /*yield*/, this.makeRequest(data)];
                    case 1:
                        response = _a.sent();
                        tokenResponse = this.handleResponse(response);
                        this.emit('fetch');
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    Token.prototype.refresh = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseClientOptions, token, refresh_token, data, response, tokenResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emit('beforeRefresh', this);
                        baseClientOptions = this.getBaseClientOptions();
                        token = this.getValue();
                        if (!token) {
                            throw new Error('NO_TOKEN');
                        }
                        refresh_token = token.refresh_token, data = tslib_1.__assign(tslib_1.__assign({}, baseClientOptions), { refresh_token: refresh_token, grant_type: 'refresh_token' });
                        return [4 /*yield*/, this.makeRequest(data)];
                    case 1:
                        response = _a.sent();
                        tokenResponse = this.handleResponse(response);
                        this.emit('refresh');
                        return [2 /*return*/, tokenResponse];
                }
            });
        });
    };
    Token.prototype.handleResponse = function (apiResponse) {
        var token = apiResponse.data;
        if (!token.token_type) {
            return;
        }
        var headers = apiResponse.response.headers;
        if (!token.expires_at && headers.date) {
            var responseAt = new Date(headers.date);
            var responseTimestamp = responseAt.getTime();
            var expiresIn = token.expires_in * 1000;
            token.expires_at = responseTimestamp + expiresIn;
        }
        this.setValue(token);
        return token;
    };
    Token.prototype.makeRequest = function (data) {
        var domain = this.environment.get('domain');
        var method = 'POST';
        var url = v4_1.default.auth.token;
        var config = {
            domain: domain,
            method: method,
            data: data,
            url: url
        };
        var request = new DomainRequest_1.default(config);
        return request.process();
    };
    return Token;
}(EventEmitter_1.default));
exports.default = Token;
