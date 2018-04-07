'use strict';
import AmoConnection from './base/AmoConnection';
import AmoRequest from './base/AmoRequest';
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder';

class AmoCRM {

  constructor( options ) {
    if ( !options ) {
      throw new Error( 'Wrong configuration' );
    }
    this._options = options;
    this._request = new AmoRequest( options.domain );
    this._connection = new AmoConnection( this._request, options.auth );

    this.assignFactories();
  }

  assignFactories() {
    const builder = new ResourceFactoryBuilder( this._request ),
      factories = builder.getResourceFactories();
    Object.assign( this, factories );
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
