'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiUrls = require('../../apiUrls');

var _apiUrls2 = _interopRequireDefault(_apiUrls);

var _EntityResource2 = require('../../base/resources/EntityResource');

var _EntityResource3 = _interopRequireDefault(_EntityResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldResource = function (_EntityResource) {
  _inherits(FieldResource, _EntityResource);

  function FieldResource() {
    _classCallCheck(this, FieldResource);

    return _possibleConstructorReturn(this, (FieldResource.__proto__ || Object.getPrototypeOf(FieldResource)).apply(this, arguments));
  }

  return FieldResource;
}(_EntityResource3.default);

FieldResource.path = _apiUrls2.default.entities.fields.path;
FieldResource.getPath = _apiUrls2.default.account;
FieldResource.deletePath = _apiUrls2.default.entities.fields.deletePath;
exports.default = FieldResource;