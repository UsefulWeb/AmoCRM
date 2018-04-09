'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResponseErrorHandler2 = require('./ResponseErrorHandler');

var _ResponseErrorHandler3 = _interopRequireDefault(_ResponseErrorHandler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityResponseErrorHandler = function (_ResponseErrorHandler) {
  _inherits(EntityResponseErrorHandler, _ResponseErrorHandler);

  function EntityResponseErrorHandler() {
    _classCallCheck(this, EntityResponseErrorHandler);

    return _possibleConstructorReturn(this, (EntityResponseErrorHandler.__proto__ || Object.getPrototypeOf(EntityResponseErrorHandler)).apply(this, arguments));
  }

  _createClass(EntityResponseErrorHandler, [{
    key: 'getErrorsData',
    value: function getErrorsData() {
      return this._response._embedded && this._response._embedded.errors;
    }
  }, {
    key: 'hasErrors',
    value: function hasErrors() {
      var errors = this.getErrorsData();
      return Boolean(errors);
    }
  }, {
    key: 'getFirstError',
    value: function getFirstError() {
      var errors = this.getErrorsData(),
          errorsNamespace = Object.keys(errors)[0],
          errorsList = errors[errorsNamespace];

      if (Array.isArray(errorsList)) {
        var _errorsList = _slicedToArray(errorsList, 1),
            firstError = _errorsList[0],
            _message = firstError.message,
            code = firstError.code;

        return new Error(errorsNamespace + ' failed with code ' + code + ': ' + _message, code);
      }

      var firstErrorKey = Object.keys(errorsList)[0],
          message = errorsList[firstErrorKey];

      return new Error(errorsNamespace + ' failed for key ' + firstErrorKey + ': ' + message);
    }
  }]);

  return EntityResponseErrorHandler;
}(_ResponseErrorHandler3.default);

exports.default = EntityResponseErrorHandler;