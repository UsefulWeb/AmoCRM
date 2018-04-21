'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RemoteResource2 = require('../../base/resources/RemoteResource');

var _RemoteResource3 = _interopRequireDefault(_RemoteResource2);

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IncomingLeadResource = function (_RemoteResource) {
  _inherits(IncomingLeadResource, _RemoteResource);

  function IncomingLeadResource() {
    _classCallCheck(this, IncomingLeadResource);

    return _possibleConstructorReturn(this, (IncomingLeadResource.__proto__ || Object.getPrototypeOf(IncomingLeadResource)).apply(this, arguments));
  }

  _createClass(IncomingLeadResource, [{
    key: 'find',
    value: function find() {
      var criteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.apiRequest('GET', _apiUrls2.default.unsorted.get, criteria);
    }
  }, {
    key: 'summary',
    value: function summary() {
      var criteria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.apiRequest('GET', _apiUrls2.default.unsorted.summary, criteria);
    }
  }, {
    key: 'insertAsSIP',
    value: function insertAsSIP() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.apiRequest('POST', _apiUrls2.default.unsorted.addFromSIP, { add: data });
    }
  }, {
    key: 'insertAsFormData',
    value: function insertAsFormData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.apiRequest('POST', _apiUrls2.default.unsorted.addFromForm, { add: data });
    }
  }, {
    key: 'accept',
    value: function accept() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.apiRequest('POST', _apiUrls2.default.unsorted.accept, data);
    }
  }, {
    key: 'decline',
    value: function decline() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.apiRequest('POST', _apiUrls2.default.unsorted.decline, data);
    }
  }]);

  return IncomingLeadResource;
}(_RemoteResource3.default);

exports.default = IncomingLeadResource;