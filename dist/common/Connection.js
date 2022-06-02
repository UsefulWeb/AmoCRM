"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var DomainRequest_1 = tslib_1.__importDefault(require("./DomainRequest"));
var AuthServer_1 = tslib_1.__importDefault(require("./AuthServer"));
var Connection = /** @class */ (function (_super) {
    tslib_1.__extends(Connection, _super);
    function Connection(environment, token, auth) {
        var _this = _super.call(this) || this;
        _this.connected = false;
        _this.authServer = null;
        _this.token = token;
        _this.environment = environment;
        _this.auth = auth;
        return _this;
    }
    Connection.prototype.update = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.connected) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(this.token.exists() && this.isTokenExpired())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.token.refresh()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.isTokenExpired()];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    Connection.prototype.isTokenExpired = function () {
        var expired = this.token.isExpired();
        this.connected = !expired;
        return expired;
    };
    Connection.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var code, hasCode, hasAuthServer, tokenExists, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connected) {
                            return [2 /*return*/, true];
                        }
                        this.emit('beforeConnect');
                        code = this.environment.get('auth.code');
                        hasCode = Boolean(code);
                        hasAuthServer = this.environment.exists('auth.server');
                        tokenExists = this.token.exists();
                        if (!(!hasCode && hasAuthServer)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.waitForUserAction()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        if (!(tokenExists && this.isTokenExpired())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.token.refresh()];
                    case 3:
                        _a.sent();
                        this.connected = this.token.isExpired();
                        return [2 /*return*/, this.connected];
                    case 4:
                        if (tokenExists) {
                            this.connected = true;
                            return [2 /*return*/, this.connected];
                        }
                        if (!hasCode && !tokenExists) {
                            throw new Error('NO_TOKEN_AND_CODE');
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.token.fetch()];
                    case 6:
                        _a.sent();
                        this.emit('connected');
                        this.connected = true;
                        return [2 /*return*/, true];
                    case 7:
                        e_1 = _a.sent();
                        this.emit('connectionError', e_1);
                        throw e_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Connection.prototype.waitForUserAction = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authOptions, port, state, options, server, code;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.authServer) {
                            return [2 /*return*/, false];
                        }
                        authOptions = this.environment.get('auth');
                        port = 3000 || ((_a = authOptions.server) === null || _a === void 0 ? void 0 : _a.port);
                        state = this.environment.get('auth.state');
                        options = {
                            state: state,
                            port: port
                        };
                        server = new AuthServer_1.default(options);
                        server.subscribe(this);
                        this.authServer = server;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                server.on('code', resolve);
                                server.run();
                            })];
                    case 1:
                        code = _b.sent();
                        return [4 /*yield*/, server.stop()];
                    case 2:
                        _b.sent();
                        this.authServer.unsubsscribe(this);
                        this.authServer = null;
                        this.environment.set('auth.code', code);
                        return [2 /*return*/, this.connect()];
                }
            });
        });
    };
    Connection.prototype.makeRequest = function (method, url, data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, domain, config, domainRequest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.update()];
                    case 1:
                        _a.sent();
                        token = this.token.getValue();
                        domain = this.environment.get('domain');
                        config = {
                            domain: domain,
                            method: method,
                            url: url,
                            data: data,
                            options: options,
                            token: token
                        };
                        domainRequest = new DomainRequest_1.default(config);
                        return [4 /*yield*/, domainRequest.process()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Connection;
}(EventEmitter_1.default));
exports.default = Connection;
//# sourceMappingURL=Connection.js.map