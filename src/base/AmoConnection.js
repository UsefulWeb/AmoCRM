'use strict';

import qs from 'qs';
import schema from '../routes/v4';
import EventResource from './EventResource';
import { delay } from '../helpers';
import PrivateDomainRequest from "./requests/domain/PrivateDomainRequest";
import AuthServer from "./auth/AuthServer";

class AmoConnection extends EventResource {

  static EVENTS = [
    'beforeConnect',
    'beforeFetchToken',
    'beforeRefreshToken',
    'checkToken',
    'authError',
    'connected',
    'error'
  ];

  constructor( options = {}) {
    super();
    this._request = new PrivateDomainRequest( options.domain );
    this._options = {
      ...options.auth
    };
    this._isConnected = false;
  }

  get connected() {
    return this._isConnected;
  }

  connectIfNeeded() {

    if ( !this._isConnected ) {
      return this.connect();
    }

    this.triggerEvent( 'checkToken', true );

    const now = new Date;

    if ( this._request.expires && now > this._request.expires ) {
      return this.refreshToken();
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

  setToken( token, tokenHandledAt ) {
    this._request.setToken( token, tokenHandledAt );
    return this;
  }

  setCode( code ) {
    this._options.code = code;
    return this.connect();
  }

  setState( state ) {
    this._state = state;
    return this;
  }

  getState( state ) {
    return this._state;
  }

  getAuthUrl( mode = 'popup' ) {
    const baseUrl = 'https://www.amocrm.ru/oauth',
      { client_id } = this._options,
      params = {
        client_id,
        mode
      },
      state = this.getState();
    if ( state ) {
      params.state = state;
    }
    const paramsStr = qs.stringify( params ),
      url = `${baseUrl}?${paramsStr}`;
    return url;
  }

  getToken() {
    return this._request.getToken();
  }

  fetchToken() {
    this.triggerEvent( 'beforeFetchToken', this );
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

    return this._request.post( schema.auth.token, data )
      .then( response => {
        this.handleToken( response );
        return response;
      });
  }

  refreshToken() {
    this.triggerEvent( 'beforeRefreshToken', this );
    console.log('refreshing token');
    const {
        client_id,
        client_secret,
        redirect_uri,
      } = this._options,
      token = this._request.getToken();
    if ( !token ) {
      console.log('no token');
      return;
    }
    const { refresh_token } = token,
      data = {
        client_id,
        client_secret,
        redirect_uri,
        refresh_token,
        grant_type: 'refresh_token',
      };

    return this._request.post( schema.auth.token, data )
      .then( response => {
        this.handleToken( response );
        return response;
      });
  }

  handleToken( response ) {
    if ( !response.data.token_type ) {
      return;
    }
    const responseAt = response.info.headers.date;
    this.setToken( response.data, responseAt );
  }

  waitUserAuth() {
    if ( this._server ) {
      return;
    }
    const server = new AuthServer({
      ...this._options.server,
      state: this.getState()
    });
    this._server = server;
    return new Promise( resolve => {
      server.on('code', code => {
        server.stop();
        this._server = null;
        this.setCode( code )
          .then( resolve );
      });
      server.run();
    })
  }

  connect() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }

    this.triggerEvent( 'beforeConnect', this );
    this._lastConnectionRequestAt = new Date;
    let requestPromise;

    if ( this._isConnected ) {
      requestPromise = this.refreshToken();
    }
    else if ( this._options.code ) {
      requestPromise = this.fetchToken();
    }
    else if ( this._options.server ) {
      return this.waitUserAuth();
    }
    else {
      return;
    }

    return requestPromise
      .then( response => {
        const { data = {}} = response;
        if ( data && data.token_type ) {
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
