import AmoCRM from '../../dist/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Contact Interface', () => {
  it( 'should create contact', done => {
    const contact = new client.Contact({
      name: 'Прокофий'
    });
    contact.save()
      .then(({ id }) => {
        expect( id ).toBeDefined();
        done();
      });
  });

  it( 'should create and update contact', async done => {
    const contact = new client.Contact({
      name: 'Name'
    });
    await contact.save();
    contact.name = 'Updated Name';
    contact.updated_at = Math.floor( new Date / 1000 ) + 10;
    await contact.save();

    const existingContact = await client.Contact.findById( contact.id );

    expect( existingContact.name ).toBe( 'Updated Name' );
    done();
  });

  it( 'create contact and remove it', done => {
    const contact = new client.Contact;
    contact.name = 'Contact for deletion';
    contact.save()
      .then(() => contact.remove())
      .then(() => client.Contact.findById( contact.id ))
      .then( removedContact => {
        expect( removedContact.id ).toBeUndefined();
        done();
      });
  });
});
