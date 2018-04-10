import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Company Interface', () => {
  it( 'should create company', done => {
    const company = new client.Company({
      name: 'Wabeco'
    });
    company.save()
      .then(({ id }) => {
        expect( id ).toBeDefined();
        done();
      });
  });

  it( 'should create and update company', done => {
    const company = new client.Company({
      name: 'Adidas'
    });
    company.save()
      .then(() => {
        company.name = 'Updated Adidas';
        company.updated_at = Math.floor( new Date / 1000 ) + 10;
        return company.save();
      })
      .then(() => client.Company.findById( company.id ))
      .then(({ name }) => {
        expect( name ).toBe( 'Updated Adidas' );
        done();
      });
  });

  fit( 'create company and remove it', done => {
    const company = new client.Company;
    company.name = 'Company for deletion';
    company.save()
      .then(() => company.remove())
      .then(() => client.Company.findById( company.id ))
      .then( removedCompany => {
        expect( removedCompany ).toBeUndefined();
        done();
      });
  });
});
