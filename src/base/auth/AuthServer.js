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
    return new Promise( resolve =>
      this._server.close()
        .on( 'close', resolve )
    );
  }
  handle( request, response ) {
    const { query } = url.parse( request.url, true ),
      { code, state } = query;
    response.end();
    if ( !code ) {
      return;
    }
    if ( state !== this._options.state ) {
      return;
    }
    this.triggerEvent( 'code', code );
  }
}

export default AuthServer;
