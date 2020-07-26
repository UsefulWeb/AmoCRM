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

  it( 'should create Customer and link with contact', async done => {
    const customer = new client.Customer({
        name: 'Wabeco'
      }),
      contact = new client.Contact({
        name: 'Bobik'
      });

    await contact.save();
    expect( contact.id ).toBeDefined();
    await customer.save({
      contact_id: contact.id
    });
    expect( customer.id ).toBeDefined();
    done();
  });

  it( 'should create Customer and link with contact and update it', async done => {
    const customer = new client.Customer({
        name: 'Wabeco'
      }),
      contact = new client.Contact({
        name: 'Bobik'
      });

    await contact.save();

    expect( contact.id ).toBeDefined();

    await customer.save({
      contact_id: contact.id
    });

    expect( customer.id ).toBeDefined();
    expect( customer.contact_id ).toBe( contact.id );

    await customer.save({
      name: 'Updated Adidas',
      updated_at: Math.floor( new Date / 1000 ) + 20,
      next_price: 120
    });

    expect( customer.name ).toBe( 'Updated Adidas' );
    done();
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
