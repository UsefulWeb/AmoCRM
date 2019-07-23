import AmoCRM from '../src/AmoCRM';
import config from './support/config';


describe( 'AmoCRM connection', () => {

  it( 'should connect with hash', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      });
    client
      .connect()
      .then( isConnected => {
        expect( isConnected ).toBe( true );
        done();
      })
      .catch( f => f );
  });

  it( 'should not connect', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash: hash + Math.random(),
          login
        }
      });
    client.connect()
      .catch( e => {
        expect( e.message ).toBe( 'Auth Error' );
        done();
      });
  });

  it( 'should trigger disconnect event', async done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash,
          login
        },
        reconnection: {
          checkDelay: 100
        }
      });
    client.on( 'connection:disconnected', () => {
      done();
    });
    await client.connect();
    client.disconnect();
  });

  it( 'should check successful events', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      }),
      events = [
        'connection:beforeConnect',
        'connection:connected'
      ];

    events.forEach( event => client
      .on( event, () => {
        const index = events.indexOf( event );
        if ( index === -1 ) {
          return;
        }
        events.splice( index, 1 );
        if ( events.length > 0 ) {
          return;
        }
        done();
      })
    );

    client.connect()
      .catch( f => f );
  });

  it( 'should check error events', done => {
    const { domain } = config,
      client = new AmoCRM({
        domain
      }),
      events = [
        'connection:beforeConnect',
        'connection:error',
        'connection:authError'
      ];

    events.forEach( event => client
      .on( event, () => {
        const index = events.indexOf( event );
        if ( index === -1 ) {
          return;
        }
        events.splice( index, 1 );
        if ( events.length > 0 ) {
          return;
        }
        done();
      })
    );

    client.connect()
      .catch( f => f );
  });

  it( 'should connect twice without error', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      });

    client
      .connect()
      .then(() => client.connect())
      .then( isConnected => {
        expect( isConnected ).toBe( true );
        done();
      })
      .catch( f => f );
  });

  it( 'shouldnt connect with wrong config', done => {
    const { auth: { hash, login } } = config,
      client = new AmoCRM({
        domain: 'error',
        auth: {
          hash, login
        }
      });

    client
      .connect()
      .then(() => client.connect())
      .catch(() => {
        done();
      });
  });

  it( 'long requests check', async done => {
    const { domain, auth: { hash, login } } = config,
      crm = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      }),
      delay = timeout => new Promise(
        resolve => setTimeout( resolve, timeout )
      ),
      delayValue = 16 * 60 * 1000;

    crm.on( 'connection:beforeReconnect', () => console.log( 'reconnected' ));
    await crm.connect();
    console.log( 'connected' );

    for ( let i = 0; i < 5; i++ ) {
      const lead = new crm.Lead({
        name: 'Lead for deletion'
      });
      await lead.save();
      console.log( 'saved' );
      await delay( delayValue );
      await lead.remove();
      console.log( 'removed' );
      await delay( delayValue );
      await crm.request.get( '/api/v2/leads' );
      console.log( 'info found' );
      await delay( delayValue );
    }
    done();
  }, 24 * 60 * 60 * 1000 );
});
