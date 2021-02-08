import AmoCRM from '../src/AmoCRM';
import config from './support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  done();
});

describe( 'AmoCRM connection', () => {

  it( 'should refreshToken', done => {
    client.connection.connect()
      .then( response => {
        console.log( response.data );
        return client.connection.refreshToken();
      })
      .then( response => console.log( response.data ))
      .then( done );
  });

  it( 'should auth with server', done => {
    client.connection.setState( 'helloworld' );
    const url = client.connection.getAuthUrl();
    console.log({
      url
    });
    client.connection.connect()
      .then( response => {
        return client.connection.refreshToken();
      })
      .then( response => console.log( response.data ))
      .then( done );
  }, 60 * 1000 );

  it( 'should return authUrl', done => {
    const url = client.connection.getAuthUrl();
    console.log({
      url
    });
    done();
  });

  it( 'should get new token', async done => {
    const url = client.connection.getAuthUrl();
    console.log({
      mode: 'should restore token',
      url
    });
    client.connection.connect();
    client.on( 'connection:newToken', response => {
      if ( !response.data ) {
        return;
      }
      console.log({
        token: response.data
      });
      done();
    });
    // done();
  }, 60 * 1000 );

  it( 'should set old token', async done => {
    client.connection.setToken( config.token );
    client.connection.connect();
    if ( !client.connection.isRequestExpired()) {
      done();
    }
    // done();
  }, 60 * 1000 );

  it( 'should set old token', async done => {
    client.connection.setToken( config.token );
    client.connection.connect();
    if ( !client.connection.isRequestExpired()) {
      done();
    }
    // done();
  }, 60 * 1000 );
});
