"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseHandler = function () {
  function ResponseHandler(response) {
    _classCallCheck(this, ResponseHandler);

    var errorHandlerClass = this.constructor.errorHandlerClass;

    this._response = response;
    if (errorHandlerClass) {
      var errorHandler = new errorHandlerClass(response);
      errorHandler.handleErrors(response);
    }
  }

  _createClass(ResponseHandler, [{
    key: "getRaw",
    value: function getRaw() {
      return this._response;
    }
  }]);

  return ResponseHandler;
}();

exports.default = ResponseHandler;