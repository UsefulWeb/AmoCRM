"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var RequestProxyTarget = function RequestProxyTarget(connection) {
  var handler = function handler() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return request(_extends({}, options, {
      connection: connection
    }));
  };

  return handler;
};

var request = function request(params) {
  var connection = params.connection,
      method = params.method,
      url = params.url,
      options = params.options,
      data = params.data;


  return connection.request(url, data, method, options);
};

exports.default = RequestProxyTarget;