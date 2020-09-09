// import AmoCRM from '../dist/AmoCRM';
import AmoCRM from '../src/AmoCRM';
import config from './support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  done();
});

describe( 'Requests', () => {

  it( 'should create custom request', done => {
    client.request( 'GET', '/api/v4/account' )
      .then( response => {
        const { data } = response;
        expect( data ).toBeDefined();
      })
      .then( done )
      .catch( console.log );
  });
  it( 'should create custom request', done => {
    client.request.get( '/api/v4/leads' )
      .then( done );
  });
  it( 'should work with 2 requests', done => {
    const url = client.connection.getAuthUrl();
    console.log({
      url
    });
    client.request.get( '/api/v4/leads' )
      .then(data => {
        console.log({ data });
        client.request.get( '/api/v4/leads' );
      })
      .then( done );
  }, 60 * 1000 );
});
