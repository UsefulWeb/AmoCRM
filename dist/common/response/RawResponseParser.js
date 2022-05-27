"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter_1 = tslib_1.__importDefault(require("../EventEmitter"));
var RawResponseParser = /** @class */ (function (_super) {
    tslib_1.__extends(RawResponseParser, _super);
    function RawResponseParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawResponseParser.prototype.parse = function (apiResponse) {
        var response = apiResponse.response;
        var data = apiResponse.data;
        return {
            response: response,
            data: data
        };
    };
    return RawResponseParser;
}(EventEmitter_1.default));
exports.default = RawResponseParser;
