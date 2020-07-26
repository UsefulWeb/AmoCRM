import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;
const { random, round } = Math;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Incoming Lead Interface', () => {

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

  it( 'create SIP', async done => {
    const lead = await new client.IncomingLead;

    const requestData = {
        source_name: 'Test SIP Source',
        source_uid: 'a1fee7c0fc436088e64ba2e8822ba2b3',
        incoming_lead_info: {
          from: '+79456153101',
          to: '+79446153101',
          date_call: '1557820080',
          duration: '8',
          link: 'http://ccrma.stanford.edu/~jos/mp3/viola2.mp3',
          service_code: round( random() * 1000 ),
          uniq: 'a1fee7c0fc436088e64ba2e8822ba2b3ewrw'
        },
        incoming_entities: {
          leads: [
            {
              name: 'SIP'
            }
          ]
        },
      },
      sipResponse = await lead.insertAsSIP( requestData );

    expect( sipResponse.status ).toBe( 'success' );

    done();
  });

  it( 'create FormData', async done => {
    const lead = await new client.IncomingLead;

    const requestData = {
        source_name: 'Тестовые данные',
        source_uid: '12312321',
        created_at: '1557734640',
        incoming_entities: {
          leads: [
            {
              name: 'Form Test'
            }
          ]
        },
        incoming_lead_info: {
          form_id: round( random() * 10000 ),
          form_page: 'https://mychamber.ru',
          ip: '123.12.34.56',
          service_code: round( random() * 1000 )
        }
      },
      formResponse = await lead.insertAsFormData( requestData );

    expect( formResponse.status ).toBe( 'success' );

    done();
  });

  it( 'accept incoming lead', async done => {
    const account = await client.getAccountInfo(),
      lead = await new client.IncomingLead;

    const requestData = {
        source_name: 'Тестовые данные',
        source_uid: '12312321',
        created_at: '1557734640',
        incoming_entities: {
          leads: [
            {
              name: 'Form Test'
            }
          ]
        },
        incoming_lead_info: {
          form_id: round( random() * 10000 ),
          form_page: 'https://mychamber.ru',
          ip: '123.12.34.56',
          service_code: round( random() * 1000 )
        }
      },
      formResponse = await lead.insertAsFormData( requestData ),
      acceptResponse = await client.IncomingLead.accept({
        accept: formResponse.data,
        user_id: account.current_user
      });

    expect( acceptResponse.status ).toBe( 'success' );

    done();
  });

  it( 'decline incoming lead', async done => {
    const account = await client.getAccountInfo(),
      { IncomingLead } = client,
      lead = await new IncomingLead;

    const requestData = {
        source_name: 'Тестовые данные',
        source_uid: round( random() * 10000 ),
        created_at: '1557734640',
        incoming_entities: {
          leads: [
            {
              name: 'Test' + round( random() * 10000 )
            }
          ]
        },
        incoming_lead_info: {
          form_id: round( random() * 10000 ),
          form_page: 'https://mychamber.ru',
          ip: '123.12.34.56',
          service_code: round( random() * 1000 )
        }
      },
      formResponse = await lead.insertAsFormData( requestData ),
      declineResponse = await IncomingLead.decline({
        decline: formResponse.data,
        user_id: account.current_user
      });

    expect( declineResponse.status ).toBe( 'success' );

    done();
  });

});
