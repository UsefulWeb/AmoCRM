'use strict';
import EventResource from './base/EventResource';
import AmoConnection from './base/AmoConnection';
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder';
import ConnectionRequest from './base/requests/ConnectionRequest';

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

    this.request = new ConnectionRequest( this._connection );
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
