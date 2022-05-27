"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var EventEmitter_1 = tslib_1.__importDefault(require("./common/EventEmitter"));
var Connection_1 = tslib_1.__importDefault(require("./common/Connection"));
var Environment_1 = tslib_1.__importDefault(require("./common/Environment"));
var ClientRequest_1 = tslib_1.__importDefault(require("./common/ClientRequest"));
var Auth_1 = tslib_1.__importDefault(require("./common/Auth"));
var Token_1 = tslib_1.__importDefault(require("./common/Token"));
var Client = /** @class */ (function (_super) {
    tslib_1.__extends(Client, _super);
    function Client(options) {
        var _this = _super.call(this) || this;
        if (!options) {
            throw new Error('NO_OPTIONS');
        }
        _this.environment = new Environment_1.default(options);
        _this.auth = new Auth_1.default(_this.environment);
        _this.token = new Token_1.default(_this.environment, _this.auth);
        _this.connection = new Connection_1.default(_this.environment, _this.token, _this.auth);
        _this.request = new ClientRequest_1.default(_this.connection);
        _this.subscribeToComponents();
        return _this;
    }
    Client.prototype.subscribeToComponents = function () {
        this.token.subscribe(this);
        this.connection.subscribe(this);
        this.auth.subscribe(this);
        this.token.subscribe(this);
    };
    return Client;
}(EventEmitter_1.default));
exports.default = Client;
