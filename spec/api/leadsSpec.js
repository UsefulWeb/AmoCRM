import AmoCRM from '../../src/AmoCRM';
import { connection } from '../support/config';
import Lead from '../../src/api/entities/Lead';

let client;

beforeEach( done => {
  client = new AmoCRM({ connection });
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Lead Interface', () => {

  it( 'basic existence', () => {
    expect( client.Lead ).toBeDefined();
  });

  it( 'create lead instance', () => {
    const lead = new client.Lead;
    expect( lead ).toBeDefined();
  });

  it( 'create lead from instance', done => {
    const lead = new client.Lead;
    lead.name = 'Test Lead';
    lead.save()
      .then( item => {
        expect( item.id ).toBeDefined();
        done();
      });
  });

  it( 'create multiple leads at same time from constructor', done => {
    const leads = ( new Array( 10 )).fill( 0 ).map(( value, index ) => {
      const lead = new client.Lead;
      lead.name = `Test Lead #${ index + 1 }`;
      return lead.save();
    });

    Promise.all( leads )
      .then(() => done());
  });
});
