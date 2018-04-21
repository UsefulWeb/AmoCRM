'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LeadResource = require('./resources/LeadResource');

var _LeadResource2 = _interopRequireDefault(_LeadResource);

var _ContactResource = require('./resources/ContactResource');

var _ContactResource2 = _interopRequireDefault(_ContactResource);

var _CompanyResource = require('./resources/CompanyResource');

var _CompanyResource2 = _interopRequireDefault(_CompanyResource);

var _NoteResource = require('./resources/NoteResource');

var _NoteResource2 = _interopRequireDefault(_NoteResource);

var _TaskResource = require('./resources/TaskResource');

var _TaskResource2 = _interopRequireDefault(_TaskResource);

var _CustomerResource = require('./resources/CustomerResource');

var _CustomerResource2 = _interopRequireDefault(_CustomerResource);

var _FieldResource = require('./resources/FieldResource');

var _FieldResource2 = _interopRequireDefault(_FieldResource);

var _PipelineResource = require('./resources/PipelineResource');

var _PipelineResource2 = _interopRequireDefault(_PipelineResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Lead: _LeadResource2.default,
  Contact: _ContactResource2.default,
  Company: _CompanyResource2.default,
  Note: _NoteResource2.default,
  Task: _TaskResource2.default,
  Customer: _CustomerResource2.default,
  Field: _FieldResource2.default,
  Pipeline: _PipelineResource2.default
};