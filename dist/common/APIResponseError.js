"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var APIResponseError = /** @class */ (function (_super) {
    tslib_1.__extends(APIResponseError, _super);
    function APIResponseError(message, response) {
        var _this = _super.call(this, message) || this;
        _this.response = response;
        return _this;
    }
    return APIResponseError;
}(Error));
exports.default = APIResponseError;
