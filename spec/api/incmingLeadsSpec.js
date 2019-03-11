import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

fdescribe( 'AmoCRM API Incoming Lead Interface', () => {

  it( 'basic existence', () => {
    expect( client.IncomingLead ).toBeDefined();
  });

  it( 'create lead instance', () => {
    const lead = new client.IncomingLead;
    expect( lead ).toBeDefined();
  });

  it( 'setting instance attributes', () => {
    const lead = new client.IncomingLead({ id: 1234 });
    expect( lead.id ).toBe( 1234 );
  });

  it( 'create lead from instance', async done => {
    const account = await client.getAccountInfo(),
      pipeline = new client.Pipeline({
        name: 'Test Pipeline',
        statuses: [
          {
            color: '#fffeb2',
            name: 'Test status'
          }
        ]
      });

    await pipeline.save();

    const lead = await new client.IncomingLead;

    const requestData = {
        source_name: 'Test SIP Source',
        source_uid: 'a1fee7c0fc436088e64ba2e8822ba2b3',
        pipeline_id: pipeline.id,
        incoming_lead_info: {
          date_call: Math.round( new Date ),
          from: '89456153101',
          to: account.current_user,
          duration: '8',
          link: 'http://ccrma.stanford.edu/~jos/mp3/viola2.mp3',
          service_code: 'CkKwPam6',
          uniq: 'a1fee7c0fc436088e64ba2e8822ba2b3ewrw',
          add_note: 'Договорились о сотрудничестве'
        }
      },
      sipResponse = await lead.insertAsSIP( requestData );

    console.log( sipResponse );

    done();

    // const lead = new client.IncomingLead;
    // lead.insertAsSIP({
    //   incoming_lead_info: {
    //
    //   }
    // })
    //   .then( item => {
    //     expect( item.id ).toBeDefined();
    //     expect( item.isNew()).toBe( false );
    //     expect( lead.id ).toBe( item.id );
    //     done();
    //   });
  });

});
