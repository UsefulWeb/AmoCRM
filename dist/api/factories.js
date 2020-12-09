'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LeadFactory = require('./factories/LeadFactory');

var _LeadFactory2 = _interopRequireDefault(_LeadFactory);

var _ContactFactory = require('./factories/ContactFactory');

var _ContactFactory2 = _interopRequireDefault(_ContactFactory);

var _CustomerFactory = require('./factories/CustomerFactory');

var _CustomerFactory2 = _interopRequireDefault(_CustomerFactory);

var _FieldFactory = require('./factories/FieldFactory');

var _FieldFactory2 = _interopRequireDefault(_FieldFactory);

var _NoteFactory = require('./factories/NoteFactory');

var _NoteFactory2 = _interopRequireDefault(_NoteFactory);

var _PipelineFactory = require('./factories/PipelineFactory');

var _PipelineFactory2 = _interopRequireDefault(_PipelineFactory);

var _TaskFactory = require('./factories/TaskFactory');

var _TaskFactory2 = _interopRequireDefault(_TaskFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Lead: _LeadFactory2.default,
  Contact: _ContactFactory2.default
  /* TODO
  Customer: CustomerFactory,
  Field: FieldFactory,
  Note: NoteFactory,
  Pipeline: PipelineFactory,
  Task: TaskFactory
  */
};