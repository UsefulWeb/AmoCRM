import AmoCRM from '../src/AmoCRM';
import { connection } from './support/config';

let client;

beforeEach( done => {
  const { domain, hash, login } = connection;
  client = new AmoCRM({ connection: { domain, hash, login } });
  client
    .connect()
    .then(() => done());
});

describe( 'AmoCRM Free Request', () => {

  it( 'should get profile data', done => {
    client.request.get( '/api/v2/account' )
      .then( response => {
        expect( response.name ).toBe( connection.domain );

        done();
      });
  });
});
