import AmoCRM from '../src/AmoCRM';
import config from './support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  done();
});

describe( 'Requests', () => {

  it( 'should create custom request', done => {
    client.request( 'GET', '/api2/v4/account' )
      .then( response => {
        const { data } = response;
        expect( data ).toBeDefined();
      })
      .then( done )
      .catch( console.log );
  });
  it( 'should create custom request', done => {
    client.request.get( '/api2/v4/leads' )
      .then( done );
  });
});
