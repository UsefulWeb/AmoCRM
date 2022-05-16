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
    'newToken',
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
    this._code = this._options.code;
  }

  get connected() {
    return this._isConnected;
  }

  connectIfNeeded() {
    if ( !this._isConnected ) {
      return this.connect();
    }

    this.triggerEvent( 'checkToken', true );

    if ( this.isRequestExpired()) {
      return this.refreshToken();
    }

    return Promise.resolve();
  }

  isRequestExpired() {
    if ( !this.getToken()) {
      return false;
    }
    const now = new Date;
    return this._request.expires && now > this._request.expires;
  }

  request( ...args ) {
    return this.connectIfNeeded()
      .then(() => {
        this._lastRequestAt = new Date;
        return this._request.request( ...args );
      });
  }

  setToken( token ) {
    this._request.setToken( token );
    this._isConnected = !this.isRequestExpired();
    return this;
  }

  setCode( code ) {
    this._code = code;
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
      } = this._options,
      data = {
        client_id,
        client_secret,
        redirect_uri,
        code: this._code,
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
    const {
        client_id,
        client_secret,
        redirect_uri,
      } = this._options,
      token = this.getToken();
    if ( !token ) {
      console.log('no token');
      return Promise.reject( 'no token' );
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
    const token = response.data;
    if ( !token.token_type ) {
      return;
    }

    if ( !token.expires_at ) {
      const { headers } = response.info,
        responseAt = new Date( headers.date ),
        responseTimestamp = responseAt.getTime(),
        expiresIn = token.expires_in * 1000;

      token.expires_at = responseTimestamp + expiresIn;
    }

    const event = {
      ...response,
      data: token
    };
    this.triggerEvent( 'newToken', event );
    this.setToken( token );
  }

  waitUserAction() {
    if ( this._server ) {
      return Promise.resolve();
    }
    const options = {
        ...this._options.server,
        state: this.getState()
      },
      server = new AuthServer( options );

    this._server = server;
    const handleCode = new Promise( resolve => {
      server.on('code', event => {
        const { code } = event;
        resolve( code );
      });
      server.run();
    });

    return handleCode
      .then( code => {
        server.stop();
        return code;
      })
      .then( code => {
        this._server = null;
        return this.setCode( code );
      });
  }

  connect() {
    if ( this._isConnected ) {
      return Promise.resolve( true );
    }

    this.triggerEvent( 'beforeConnect', this );
    this._lastConnectionRequestAt = new Date;

    if ( !this._code && this._options.server ) {
      return this.waitUserAction();
    }
    else if ( this.getToken() && this.isRequestExpired()) {
      return this.refreshToken();
    } else if ( !this._code && !this.getToken() ) {
      return Promise.resolve( false );
    }

    return this.fetchToken()
      .then( response => {
        const { data = {}} = response;
        if ( data && data.token_type ) {
          this._lastRequestAt = new Date;
          this.triggerEvent( 'connected', this );
          this._isConnected = true;
          return Promise.resolve( true );
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
