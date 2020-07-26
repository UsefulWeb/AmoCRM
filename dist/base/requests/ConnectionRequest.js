'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ConnectionRequest = function ConnectionRequest(auth) {
  var handler = function handler(method, url, data, options) {
    return request({
      url: url,
      data: data,
      method: method,
      options: options,
      auth: auth
    });
  },
      requestWithMethod = function requestWithMethod(method) {
    return handler.bind(null, method);
  },
      get = requestWithMethod('GET'),
      post = requestWithMethod('POST'),
      patch = requestWithMethod('PATCH');

  Object.assign(handler, {
    get: get,
    post: post,
    patch: patch
  });

  return handler;
},
    request = function request(params) {
  var auth = params.auth,
      method = params.method,
      url = params.url,
      _params$options = params.options,
      options = _params$options === undefined ? {} : _params$options,
      data = params.data;

  return auth.request(url, data, method, options);
};

exports.default = ConnectionRequest;