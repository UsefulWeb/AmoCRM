import http from 'http';
import url from 'url';
import EventResource from './../EventResource';

class AuthServer extends EventResource {
  constructor( options ) {
    super();
    this._options = options;
  }
  run() {
    const { port } = this._options,
      handler = this.handle.bind( this );
    this._server = http.createServer( handler )
      .listen( port );
  }
  stop() {
    return new Promise(( resolve, reject ) =>
      this._server.close()
        .on( 'close', resolve )
        .on( 'error', reject )
    );
  }
  handle( request, response ) {
    const { query } = url.parse( request.url, true ),
      currentState = this._options.state,
      { code, state } = query;
    response.end();
    if ( !code ) {
      return;
    }
    if ( currentState && state !== currentState ) {
      return;
    }
    this.triggerEvent( 'code', {
      code,
      state
    });
  }
}

export default AuthServer;
