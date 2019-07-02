'use strict';

import schema from '../apiUrls.js';
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

  async request( ...args ) {
    await this.connectIfNeeded();
    this._lastRequestAt = new Date;
    return await this._request.request( ...args );
  }


  reconnect() {
    this._isConnected = false;
    this.triggerEvent( 'beforeReconnect', true );
    return this.connect();
  }

  connect() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }
    const { login, hash } = this._options,
      data = {
        USER_LOGIN: login,
        USER_HASH: hash
      };

    this.triggerEvent( 'beforeConnect', this );

    this._lastConnectionRequestAt = new Date;
    return this._request.post( schema.auth, data, {
      headers: { 'Content-Type': 'application/json' },
      response: {
        saveCookies: true,
        dataType: 'json'
      }
    })
      .then( data => {
        if ( data && data.response && data.response.auth ) {
          this._isConnected = data.response.auth === true;
        }

        if ( this._isConnected ) {
          this._lastRequestAt = new Date;
          this.triggerEvent( 'connected', this );
          return true;
        }

        const e = new Error( 'Auth Error' );
        e.data = data.response;

        this.triggerEvent( 'authError', e, this );
        this.triggerEvent( 'error', e, this );

        return Promise.reject( e );
      });
  }
}
module.exports = AmoConnection;
