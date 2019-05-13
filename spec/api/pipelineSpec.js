import config from '../support/config';
import AmoCRM from '../../src/AmoCRM';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Pipeline Interface', () => {

  it( 'creates pipeline', done => {
    const pipeline = new client.Pipeline({
      name: 'Test Pipeline',
      statuses: [
        {
          color: '#fffeb2',
          name: 'Test status'
        }
      ]
    });

    pipeline.save()
      .then( pipeline => {
        expect( pipeline.id ).toBeDefined();
      })
      .then(() => client.Pipeline.findById( pipeline.id ))
      .then( pipeline => {
        expect( pipeline.name ).toBe( 'Test Pipeline' );
        done();
      });
  });

  it( 'creates and updates pipeline', done => {
    const pipeline = new client.Pipeline({
      name: 'Test Pipeline',
      statuses: [
        {
          color: '#fffeb2',
          name: 'Test status'
        }
      ]
    });

    pipeline.save()
      .then( pipeline => {
        expect( pipeline.id ).toBeDefined();
      })
      .then(() => client.Pipeline.findById( pipeline.id ))
      .then( pipeline => pipeline.save({
        name: 'Updated Pipeline'
      }))
      .then( pipeline => {
        expect( pipeline.name ).toBe( 'Updated Pipeline' );
        done();
      });
  });

  it( 'removes all pipelines', done => {
    client.Pipeline.find()
      .then( pipelines => {
        const ids = pipelines
          .filter( pipeline => pipeline.is_main !== 'on' );

        return client.Pipeline.remove( ids );
      })
      .catch( console.log )
      .then( done );
  });

});
