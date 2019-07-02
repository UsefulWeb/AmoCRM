import AmoCRM from '../src/AmoCRM';
import config from './support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'Requests', () => {

  it( 'should get account data', done => {
    client.request.get( '/api/v2/account' )
      .then( account => {
        const domain = config.domain.substr( 0, config.domain.indexOf( '.' ));
        expect( account.subdomain ).toBe( domain );
        done();
      });
  });

  it( 'should create lead', done => {
    client.request.post( '/api/v2/leads', {
      add: [
        {
          name: 'Покупка карандашей',
          tags: 'pencil, buy'
        }
      ]
    })
      .then( response => {
        expect( response._embedded.items.length ).toBe( 1 );
        expect( response._embedded.items[ 0 ]).toBeDefined();
        done();
      });
  });

  it( 'should get leads list', done => {
    client.request.get( '/api/v2/leads', {
      add: [
        {
          name: 'Покупка карандашей',
          tags: 'pencil, buy'
        }
      ]
    })
      .then( response => {
        expect( response._embedded.items[ 0 ]).toBeDefined();
        done();
      });
  });
});
