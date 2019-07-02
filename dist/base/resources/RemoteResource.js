"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RemoteResource = function () {
  /**
   * @param connection {AmoConnection}
   */
  function RemoteResource(connection) {
    _classCallCheck(this, RemoteResource);

    this._connection = connection;
  }

  _createClass(RemoteResource, [{
    key: "request",
    value: function request(method, path, data, options) {
      var responseHandlerClass = this.constructor.responseHandlerClass;

      return this._connection.request(path, data, method, options).then(function (response) {
        if (!responseHandlerClass) {
          return response;
        }
        return new responseHandlerClass(response);
      });
    }
  }]);

  return RemoteResource;
}();

exports.default = RemoteResource;