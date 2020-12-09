'use strict';

Object.defineProperty( exports, '__esModule', {
  value: true
});

var _LeadFactory = require( './factories/LeadFactory' ),

  _LeadFactory2 = _interopRequireDefault( _LeadFactory );

var _ContactFactory = require( './factories/ContactFactory' ),

  _ContactFactory2 = _interopRequireDefault( _ContactFactory );

var _CustomerFactory = require( './factories/CustomerFactory' ),

  _CustomerFactory2 = _interopRequireDefault( _CustomerFactory );

var _FieldFactory = require( './factories/FieldFactory' ),

  _FieldFactory2 = _interopRequireDefault( _FieldFactory );

var _NoteFactory = require( './factories/NoteFactory' ),

  _NoteFactory2 = _interopRequireDefault( _NoteFactory );

var _PipelineFactory = require( './factories/PipelineFactory' ),

  _PipelineFactory2 = _interopRequireDefault( _PipelineFactory );

var _TaskFactory = require( './factories/TaskFactory' ),

  _TaskFactory2 = _interopRequireDefault( _TaskFactory );

function _interopRequireDefault( obj ) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
