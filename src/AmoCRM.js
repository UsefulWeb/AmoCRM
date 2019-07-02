'use strict';
import EventResource from './base/EventResource';
import AmoConnection from './base/AmoConnection';
import PrivateDomainRequest from './base/requests/domain/PrivateDomainRequest';
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder';

class AmoCRM extends EventResource {

  constructor( options ) {
    super();
    if ( !options ) {
      throw new Error( 'Wrong configuration' );
    }

    options = Object.assign({
      auth: {}
    }, options );

    this._options = options;
    this._connection = new AmoConnection( options );

    this.registerEvents();
    this.assignFactories();
  }

  registerEvents() {

    this.proxyEventHandlers( 'connection', AmoConnection.EVENTS, this._connection );
    this._connection.on( 'error', ( ...args ) =>
      this.triggerEvent( 'error', ...args )
    );
  }

  assignFactories() {
    const builder = new ResourceFactoryBuilder( this._connection ),
      factories = builder.getResourceFactories();
    Object.assign( this, factories );
  }

  get request() {
    return {
      get: ( url, data, options ) => this._connection.request( url, data, 'GET', options ),
      post: ( url, data, options ) => this._connection.request( url, data, 'POST', options )
    };
  }

  get connection() {
    return this._connection;
  }

  connect() {
    return this._connection.connect();
  }

  disconnect() {
    return this._connection.disconnect();
  }
}

module.exports = AmoCRM;
