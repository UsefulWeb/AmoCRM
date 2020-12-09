"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntityResponseErrorHandler = require("./EntityResponseErrorHandler");

var _EntityResponseErrorHandler2 = _interopRequireDefault(_EntityResponseErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrivateDomainResponseErrorHandler = function (_EntityResponseErrorH) {
  _inherits(PrivateDomainResponseErrorHandler, _EntityResponseErrorH);

  function PrivateDomainResponseErrorHandler() {
    _classCallCheck(this, PrivateDomainResponseErrorHandler);

    return _possibleConstructorReturn(this, (PrivateDomainResponseErrorHandler.__proto__ || Object.getPrototypeOf(PrivateDomainResponseErrorHandler)).apply(this, arguments));
  }

  _createClass(PrivateDomainResponseErrorHandler, [{
    key: "getErrorsData",
    value: function getErrorsData() {
      var status = this._response.status;

      if (status && status >= 400 && this._response.detail) {
        return [this._response.detail];
      }
      // for multiactions
      if (this._response.response && this._response.response.multiactions) {
        return this._response.response.multiactions.set.errors;
      }
      // for ajax requests (single id like lead remove )
      if (this._response.ERRORS) {
        return this._response.ERRORS;
      }
      return _get(PrivateDomainResponseErrorHandler.prototype.__proto__ || Object.getPrototypeOf(PrivateDomainResponseErrorHandler.prototype), "getErrorsData", this).call(this);
    }
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      var errors = this.getErrorsData();
      if (Array.isArray(errors) && errors.length > 0) {
        return true;
      }
      return Boolean(errors);
    }
  }, {
    key: "getFirstError",
    value: function getFirstError() {
      var errors = this.getErrorsData();
      if (Array.isArray(errors)) {
        var _errors = _slicedToArray(errors, 1),
            message = _errors[0];

        return new Error(message);
      }
      return _get(PrivateDomainResponseErrorHandler.prototype.__proto__ || Object.getPrototypeOf(PrivateDomainResponseErrorHandler.prototype), "getFirstError", this).call(this);
    }
  }]);

  return PrivateDomainResponseErrorHandler;
}(_EntityResponseErrorHandler2.default);

exports.default = PrivateDomainResponseErrorHandler;