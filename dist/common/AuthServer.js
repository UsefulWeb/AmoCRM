"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http = tslib_1.__importStar(require("http"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var AuthServer = /** @class */ (function (_super) {
    tslib_1.__extends(AuthServer, _super);
    function AuthServer(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        return _this;
    }
    AuthServer.prototype.run = function () {
        var port = this.options.port;
        var handler = this.handle.bind(this);
        var onListenStart = this.onListenStart.bind(this);
        this.instance = http
            .createServer(handler)
            .listen(port, onListenStart);
    };
    AuthServer.prototype.onListenStart = function () {
        var port = this.options.port;
        console.log("auth server listening on port ".concat(port));
    };
    AuthServer.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.instance === undefined) {
                return resolve();
            }
            _this.instance.close()
                .on('close', resolve)
                .on('error', reject);
        });
    };
    AuthServer.prototype.handle = function (request, response) {
        console.log('handled auth server callback');
        if (!request.url) {
            response.end({
                message: 'NO_URL'
            });
            return;
        }
        var params = request.url.substring(2);
        var searchParams = new URLSearchParams(params);
        var query = Object.fromEntries(searchParams);
        var currentState = this.options.state;
        var code = query.code, state = query.state;
        if (!code) {
            response.end('NO_CODE');
            return;
        }
        if (currentState && state !== currentState) {
            response.end('STATE_MISMATCH');
            return;
        }
        this.emit('code', {
            code: code,
            state: state
        });
        response.end('VALID_CODE');
    };
    return AuthServer;
}(EventEmitter_1.default));
exports.default = AuthServer;
