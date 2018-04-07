'use strict';
import AmoConnection from './base/AmoConnection';
import AmoRequest from './base/AmoRequest';
import factories from './api/factories';


class AmoCRM {

  constructor( options = {}) {
    this._options = options;
    if( !options.connection ) {
      throw new Error( 'Wrong connection configuration' );
    }
    this._request = new AmoRequest( options.connection.domain );
    this._connection = new AmoConnection( this._request, options.connection.auth );

    this.assignFactories();
  }

  assignFactories() {
    Object.keys( factories ).forEach( factoryName => {
      const factory = new factories[ factoryName ]( this._request ),
        handler = this.createFactoryHandler( factory ),
        target = function target() {};
      this[ factoryName ] = new Proxy( target, handler );
    });
  }

  createFactoryHandler( factory ) {
    return {
      /**
       * @param target {EntityFactory}
       * @param attributes {object}
       */
      construct: ( target, attributes ) => factory.create( attributes ),
      get: ( target, attribute ) => factory[ attribute ]
    };
  }

  get request() {
    return {
      get: ( ...args ) => this._request.get( ...args ),
      post: ( ...args ) => this._request.post( ...args )
    };
  }

  connect() {
    return this._connection.connect();
  }
}

module.exports = AmoCRM;
