'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionRequest = function () {
  /**
   *
   * @param {Connection} connection
   */
  function ConnectionRequest(connection) {
    _classCallCheck(this, ConnectionRequest);

    this._connection = connection;
  }

  _createClass(ConnectionRequest, [{
    key: 'get',
    value: function get(url, data, options) {
      return this._connection.request(url, data, 'GET', options);
    }
  }, {
    key: 'post',
    value: function post(url, data, options) {
      return this._connection.request(url, data, 'POST', options);
    }
  }]);

  return ConnectionRequest;
}();

exports.default = ConnectionRequest;