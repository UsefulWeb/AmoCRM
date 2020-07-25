import AmoCRM from '../dist/AmoCRM';
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
});
