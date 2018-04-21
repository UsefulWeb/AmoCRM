"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityResponseHandler = require("../../base/responseHandlers/EntityResponseHandler");

var _EntityResponseHandler2 = _interopRequireDefault(_EntityResponseHandler);

var _EntityResponseErrorHandler = require("../../base/errorHandlers/EntityResponseErrorHandler");

var _EntityResponseErrorHandler2 = _interopRequireDefault(_EntityResponseErrorHandler);

var _PipelineResponseErrorHandler = require("../errorHandlers/PipelineResponseErrorHandler");

var _PipelineResponseErrorHandler2 = _interopRequireDefault(_PipelineResponseErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PipelineResponseHandler = function (_EntityResponseHandle) {
  _inherits(PipelineResponseHandler, _EntityResponseHandle);

  function PipelineResponseHandler() {
    _classCallCheck(this, PipelineResponseHandler);

    return _possibleConstructorReturn(this, (PipelineResponseHandler.__proto__ || Object.getPrototypeOf(PipelineResponseHandler)).apply(this, arguments));
  }

  _createClass(PipelineResponseHandler, [{
    key: "getItems",
    value: function getItems() {
      if (Array.isArray(this._response)) {
        return this._response;
      }

      var embedded = this.getEmbedded(),
          items = embedded && embedded.items;

      if ((typeof items === "undefined" ? "undefined" : _typeof(items)) === 'object' && !Array.isArray(items)) {
        return Object.keys(items).map(function (id) {
          return items[id];
        });
      }
      return items || [];
    }
  }, {
    key: "getModifiedItems",
    value: function getModifiedItems(type) {
      return this._response.response.pipelines[type].pipelines;
    }
  }, {
    key: "getFirstModifiedItem",
    value: function getFirstModifiedItem(type) {
      var items = this.getModifiedItems(type),
          firstKey = Object.keys(items)[0];
      return items[firstKey];
    }
  }]);

  return PipelineResponseHandler;
}(_EntityResponseHandler2.default);

PipelineResponseHandler.errorHandlerClass = _PipelineResponseErrorHandler2.default;
exports.default = PipelineResponseHandler;