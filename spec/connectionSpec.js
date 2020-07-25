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
});
