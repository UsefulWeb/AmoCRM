"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qs = tslib_1.__importStar(require("qs"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var Auth = /** @class */ (function (_super) {
    tslib_1.__extends(Auth, _super);
    function Auth(environment, token) {
        var _this = _super.call(this) || this;
        _this.environment = environment;
        _this.token = token;
        return _this;
    }
    Auth.prototype.setCode = function (code) {
        this.environment.set('auth.code', code);
        this.token.clear();
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
        var state = this.environment.get('auth.state');
        if (state) {
            params.state = state;
        }
        var paramsStr = qs.stringify(params);
        return "".concat(baseUrl, "?").concat(paramsStr);
    };
    return Auth;
}(EventEmitter_1.default));
exports.default = Auth;
//# sourceMappingURL=Auth.js.map