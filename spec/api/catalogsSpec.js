import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

fdescribe( 'AmoCRM API Catalog Interface', () => {
  it( 'should create Catalog', done => {
    const catalog = new client.Catalog({
      name: 'Wabeco'
    });
    catalog.save()
      .then(({ id }) => {
        expect( id ).toBeDefined();
        done();
      });
  });

  it( 'should create and update Catalog', done => {
    const catalog = new client.Catalog({
      name: 'Adidas'
    });
    catalog.save()
      .then(() => {
        catalog.name = 'Updated Adidas';
        catalog.updated_at = Math.floor( new Date / 1000 ) + 10;
        return catalog.save();
      })
      .then(() => client.Catalog.findById( catalog.id ))
      .then(({ name }) => {
        expect( name ).toBe( 'Updated Adidas' );
        done();
      });
  });

  it( 'create Catalog and remove it', done => {
    const catalog = new client.Catalog;
    catalog.name = 'Catalog for deletion';
    catalog.save()
      .then(() => catalog.remove())
      .then(() => client.Catalog.findById( catalog.id ))
      .then( removedCatalog => {
        expect( removedCatalog ).toBeUndefined();
        done();
      });
  });
});
