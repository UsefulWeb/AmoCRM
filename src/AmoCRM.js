'use strict';
import EventResource from './base/EventResource';
import Auth from './base/auth/Auth';
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder';
import ConnectionRequest from './base/requests/ConnectionRequest';
import LeadFactory from './api/factories/LeadFactory';
/**
 * Construct a new component
 * @class AmoCRM
 *
 * @param {LeadFactory} Lead
 */
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

    this.auth = new Auth( options );
    this.request = new ConnectionRequest( this.auth );
    this.registerEvents();
    this.assignFactories();
  }

  registerEvents() {
    this.proxyEventHandlers( 'auth', Auth.EVENTS, this.auth );
    this._connection.on( 'error', ( ...args ) =>
      this.triggerEvent( 'error', ...args )
    );
  }

  assignFactories() {
    const builder = new ResourceFactoryBuilder( this.auth ),
      factories = builder.getResourceFactories();
    Object.assign( this, factories );
  }
}

module.exports = AmoCRM;
