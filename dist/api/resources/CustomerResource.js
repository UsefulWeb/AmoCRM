'use strict';

Object.defineProperty( exports, '__esModule', {
  value: true
});

var _v = require( '../../routes/v2' ),

  _v2 = _interopRequireDefault( _v );

var _RemovableEntityResource = require( '../../base/resources/RemovableEntityResource' ),

  _RemovableEntityResource2 = _interopRequireDefault( _RemovableEntityResource );

function _interopRequireDefault( obj ) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck( instance, Constructor ) {
  if ( !( instance instanceof Constructor )) {
    throw new TypeError( 'Cannot call a class as a function' );
  }
}

function _possibleConstructorReturn( self, call ) {
  if ( !self ) {
    throw new ReferenceError( 'this hasn\'t been initialised - super() hasn\'t been called' );
  } return call && ( typeof call === 'object' || typeof call === 'function' ) ? call : self;
}

function _inherits( subClass, superClass ) {
  if ( typeof superClass !== 'function' && superClass !== null ) {
    throw new TypeError( 'Super expression must either be null or a function, not ' + typeof superClass );
  } subClass.prototype = Object.create( superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if ( superClass ) {
    Object.setPrototypeOf ? Object.setPrototypeOf( subClass, superClass ) : subClass.__proto__ = superClass;
  }
}

var CustomerResource = function( _RemoveableEntityReso ) {
  _inherits( CustomerResource, _RemoveableEntityReso );

  function CustomerResource() {
    _classCallCheck( this, CustomerResource );

    return _possibleConstructorReturn( this, ( CustomerResource.__proto__ || Object.getPrototypeOf( CustomerResource )).apply( this, arguments ));
  }

  return CustomerResource;
}( _RemovableEntityResource2.default );

CustomerResource.path = _v2.default.entities.customers.path;
CustomerResource.deletePath = _v2.default.entities.customers.deletePath;
exports.default = CustomerResource;
