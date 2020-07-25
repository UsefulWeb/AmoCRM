'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResponseHandler2 = require('./ResponseHandler');

var _ResponseHandler3 = _interopRequireDefault(_ResponseHandler2);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomainResponseHandler = function (_ResponseHandler) {
  _inherits(DomainResponseHandler, _ResponseHandler);

  function DomainResponseHandler() {
    _classCallCheck(this, DomainResponseHandler);

    return _possibleConstructorReturn(this, (DomainResponseHandler.__proto__ || Object.getPrototypeOf(DomainResponseHandler)).apply(this, arguments));
  }

  _createClass(DomainResponseHandler, [{
    key: 'toJSON',
    value: function toJSON(options) {
      var resonseData = this._response;
      if (!resonseData) {
        return Promise.resolve({});
      }
      if (options.dataType === 'xml') {
        return new Promise(function (resolve, reject) {
          (0, _xml2js.parseString)(resonseData, function (err, data) {
            if (err) {
              return reject(err);
            }
            resolve(data);
          });
        });
      }

      var data = void 0;

      try {
        data = JSON.parse(resonseData);
      } catch (e) {
        throw Error('cannot parse JSON: ' + resonseData);
      }
      return Promise.resolve({
        info: this._responseInfo,
        data: data
      });
    }
  }]);

  return DomainResponseHandler;
}(_ResponseHandler3.default);

exports.default = DomainResponseHandler;