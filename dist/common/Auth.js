"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qs = tslib_1.__importStar(require("qs"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var Auth = /** @class */ (function (_super) {
    tslib_1.__extends(Auth, _super);
    function Auth(environment) {
        var _this = _super.call(this) || this;
        _this.environment = environment;
        var auth = environment.get('auth');
        if (!auth) {
            throw new Error('NO_AUTH_OPTIONS');
        }
        var _a = auth.code, code = _a === void 0 ? '' : _a, _b = auth.state, state = _b === void 0 ? '' : _b;
        _this.state = state;
        _this.code = code;
        return _this;
    }
    Auth.prototype.getState = function () {
        return this.state;
    };
    Auth.prototype.setState = function (state) {
        this.state = state;
    };
    Auth.prototype.getCode = function () {
        return this.code;
    };
    Auth.prototype.setCode = function (code) {
        this.code = code;
    };
    Auth.prototype.hasCode = function () {
        return Boolean(this.code);
    };
    Auth.prototype.getUrl = function (mode) {
        if (mode === void 0) { mode = 'popup'; }
        var baseUrl = 'https://www.amocrm.ru/oauth';
        var options = this.environment.get();
        var client_id = options.auth.client_id;
        var params = {
            client_id: client_id,
            mode: mode
        };
        var state = this.getState();
        if (state) {
            params.state = state;
        }
        var paramsStr = qs.stringify(params);
        return "".concat(baseUrl, "?").concat(paramsStr);
    };
    return Auth;
}(EventEmitter_1.default));
exports.default = Auth;
