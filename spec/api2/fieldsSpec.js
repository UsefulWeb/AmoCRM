import config from '../support/config';
import AmoCRM from '../../src/AmoCRM';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Field Interface', () => {

  fit( 'get fields list', done => {
    client.Field.find()
      .then( fields => {
        expect( Array.isArray( fields )).toBe( true );
        done();
      });
  });

});
