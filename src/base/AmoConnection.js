'use strict';

import schema from '../routes/v4';
import EventResource from './EventResource';
import { delay } from '../helpers';
import PrivateDomainRequest from "./requests/domain/PrivateDomainRequest";

class AmoConnection extends EventResource {

  static EVENTS = [
    'beforeReconnect',
    'beforeConnect',
    'checkReconnect',
    'authError',
    'connected',
    'disconnected',
    'error'
  ];

  static SESSION_LIFETIME = 15 * 60 * 1000;

  constructor( options = {}) {
    super();
    this._request = new PrivateDomainRequest( options.domain );
    this._options = options.auth;
    this._isConnected = false;
  }

  get connected() {
    return this._isConnected;
  }

  disconnect() {
    this._request.clear();
    this._isConnected = false;

    this.triggerEvent( 'disconnected', true );
  }

  connectIfNeeded() {

    if ( !this._isConnected ) {
      return this.connect();
    }

    this.triggerEvent( 'checkReconnect', true );

    const { SESSION_LIFETIME } = this.constructor,
      sessionExpiresAt = +this._lastRequestAt + SESSION_LIFETIME,
      now = new Date;

    if ( now > sessionExpiresAt ) {
      return this.reconnect();
    }

    if ( this._request.expires && now > this._request.expires ) {
      return this.reconnect();
    }

    return Promise.resolve();
  }

  request( ...args ) {
    return this.connectIfNeeded()
      .then(() => {
        this._lastRequestAt = new Date;
        return this._request.request( ...args );
      });
  }


  reconnect() {
    this._isConnected = false;
    this._request.clear();
    this.triggerEvent( 'beforeReconnect', true );
    return this.connect();
  }

  connect() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }
    const {
        client_id,
        client_secret,
        redirect_uri,
        code
      } = this._options,
      data = {
        client_id,
        client_secret,
        redirect_uri,
        code,
        grant_type: 'authorization_code',
      };

    this.triggerEvent( 'beforeConnect', this );
    // console.log({ data });
    this._lastConnectionRequestAt = new Date;
    return this._request.post( schema.auth.token, data )
      .then( response => {
        const { data = {}} = response;
        if ( data && data.token_type ) {
          this._isConnected = true;
        }

        if ( this._isConnected ) {
          const responseAt = response.info.headers.date;
          this._request.setToken( data, responseAt );
          this._lastRequestAt = new Date;
          this.triggerEvent( 'connected', this );
          return true;
        }

        const e = new Error( 'Auth Error' );
        e.data = data;

        this.triggerEvent( 'authError', e, this );
        this.triggerEvent( 'error', e, this );

        return Promise.reject( e );
      });
  }
}
module.exports = AmoConnection;
