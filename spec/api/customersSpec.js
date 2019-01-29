import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Customer Interface', () => {
  it( 'should create Customer', done => {
    const customer = new client.Customer({
      name: 'Wabeco'
    });
    customer.save()
      .then(({ id }) => {
        expect( id ).toBeDefined();
        done();
      });
  });

  it( 'should create and update Customer', done => {
    const customer = new client.Customer({
      name: 'Adidas'
    });
    customer.save()
      .then(() => {
        customer.name = 'Updated Adidas';
        customer.updated_at = Math.floor( new Date / 1000 ) + 10;
        return customer.save();
      })
      .then(() => client.Customer.findById( customer.id ))
      .then(({ name }) => {
        expect( name ).toBe( 'Updated Adidas' );
        done();
      });
  });

  it( 'create Customer and remove it', done => {
    const customer = new client.Customer;
    customer.name = 'Customer for deletion';
    customer.save()
      .then(() => customer.remove())
      .then(() => client.Customer.findById( customer.id ))
      .then( removedCustomer => {
        expect( removedCustomer ).toBeUndefined();
        done();
      });
  });
});
