'use strict';
import AmoConnection from './AmoConnection';
import AmoRequest from './AmoRequest';
import Lead from './Entities/Lead';

const entities = [ Lead ];

class AmoCRM {

  constructor( options = {}) {
    this._options = options;
    if ( options.connection ) {
      this.connection = new AmoConnection( options.connection );
      this.request = new AmoRequest( options.connection.domain );
    }

    this.buildEntityFactories();
  }

  buildEntityFactories() {
    for ( let i = 0, len = entities.length; i < len; i++ ) {
      const factoryName = entities[ i ].name;
      this[ factoryName ] = ( ...args ) => {
        const instance = new entities[ i ]( ...args );
        instance.request = this._request;
        return instance;
      };
    }
  }

  set connection( connection ) {
    this._connection = connection;
  }

  set request( request ) {
    if ( this._connection ) {
      this._connection.request = request;
    }
    this._request = request;
  }

  get request() {
    return {
      get: ( ...args ) => this._request.get( ...args ),
      post: ( ...args ) => this._request.post( ...args )
    };
  }

  connect() {
    if ( this._connection === undefined ) {
      throw new Error( 'client doesnt have any connection configuration' );
    }
    return this._connection.connect();
  }
}

module.exports = AmoCRM;
