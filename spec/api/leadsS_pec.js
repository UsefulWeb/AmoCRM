import AmoCRM from '../../dist/AmoCRM';
import config from '../support/config';
import Lead from '../../src/api/activeRecords/Lead';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
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

  it( 'setting instance attributes', () => {
    const lead = new client.Lead({ id: 1234 });
    expect( lead.id ).toBe( 1234 );
  });

  it( 'create lead from instance', done => {
    const lead = new client.Lead;
    lead.name = 'Test Lead';
    lead.save()
      .then( item => {
        expect( item.id ).toBeDefined();
        expect( item.isNew() ).toBe( false );
        expect( lead.id ).toBe( item.id );
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

  it( 'create lead and load it by id', done => {
    const newLead = new client.Lead;
    newLead.name = 'Created lead';
    newLead.save()
      .then(({ id }) => client.Lead.findById( id ))
      .then( existingLead => {
        expect( existingLead.id ).toBe( newLead.id );
        done();
      });
  });

  it( 'create lead and fill new lead by its attributes', done => {
    const newLead = new client.Lead;
    newLead.name = 'Created lead';
    newLead.save()
      .then(({ id }) => {
        const existingLead = new client.Lead({ id });
        expect( Object.keys( existingLead.attributes ).length ).toBe( 1 );
        expect( existingLead.id ).toBe( id );
        expect( existingLead.id ).toBe( newLead.id );
        done();
      });
  });

  it( 'create lead and fetch it by id', done => {
    const newLead = new client.Lead;
    newLead.name = 'Created lead';
    newLead.save()
      .then(({ id }) => {
        const existingLead = new client.Lead({ id });
        return existingLead.fetch();
      })
      .then( existingLead => {
        expect( existingLead.name ).toBe( newLead.name );
        expect( existingLead.id ).toBe( newLead.id );
        done();
      });
  });

  it( 'create lead and update it', done => {
    const newLead = new client.Lead;
    newLead.name = 'Created lead';
    newLead.save()
      .then( lead => {
        expect( lead.name ).toBe( 'Created lead' );
        lead.name = 'Updated lead';
        lead.updated_at = Math.ceil( new Date / 1000 ) + 20;
        return lead.save();
      })
      .then(({ id }) => {
        const lead = new client.Lead({ id });
        return lead.fetch();
      })
      .then( lead => {
        expect( lead.name ).toBe( 'Updated lead' );
        done();
      });
  });

  it( 'create lead and remove it', done => {
    const newLead = new client.Lead;
    newLead.name = 'Lead for deletion';
    newLead.save()
      .then( lead => {
        return lead.remove();
      })
      .then(({ id }) => {
        const lead = new client.Lead({ id });
        return lead.fetch();
      })
      .then( lead => {
        expect( lead.id ).toBeUndefined();
        done();
      });
  });
});
