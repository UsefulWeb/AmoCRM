'use strict';
import EventResource from './base/EventResource';
import Connection from './base/connection/Connection';
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder';
import schema from './apiUrls';
import ConnectionRequest from './base/connection/ConnectionRequest';

/**
 * @property {LeadFactory} Lead
 * @property {ContactFactory} Contact
 * @property {CatalogFactory} Catalog
 * @property {CatalogElementFactory} CatalogElement
 * @property {CompanyFactory} Company
 * @property {NoteFactory} Note
 * @property {TaskFactory} Task
 * @property {CustomerFactory} Customer
 * @property {IncomingLeadFactory} IncomingLead
 * @property {FieldFactory} Field
 * @property {PipelineFactory} Pipeline
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

    const connection = new Connection( options );
    this._options = options;
    this._connection = connection;
    this._request = new ConnectionRequest( connection );

    this.registerEvents();
    this.assignFactories();
  }

  registerEvents() {
    this.proxyEventHandlers( 'connection', Connection.EVENTS, this._connection );
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
    return this._request;
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

  getAccountInfo( options = {}) {
    const { details = [], includeFreeUsers = false } = options;
    let url = schema.account + '?with=' + details.join( ',' );
    if ( includeFreeUsers ) {
      url += '&free_users=Y';
    }
    return this.request.get( url );
  }
}

module.exports = AmoCRM;
