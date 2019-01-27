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
      });
  });

  it( 'should connect and reconnect after 2 seconds', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      });
    client.connect();

    let date;

    client
      .on( 'connection:connected', connection => {
        date = new Date;
        date.setSeconds( date.getSeconds() + 2 );
        connection.reconnectAt( date, 10 );
      })
      .on( 'connection:beforeReconnect', () => {
        const now = new Date,
          seconds = Math.abs( now.getSeconds() - date.getSeconds());
        expect( seconds ).toBe( 2 );
        done();
      });
  });

  it( 'should reconnect once and reject other attempts', done => {
    const { domain, auth: { hash, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          hash, login
        }
      });
    client.connect();

    let date;

    client
      .on( 'connection:connected', connection => {
        date = new Date;
        date.setSeconds( date.getSeconds() + 2 );
        connection.reconnectAt( date, 10, 0 )
          .catch( done );
        connection.reconnectAt( date, 10, 0 );
      });
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

    client.connect();
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

    client.connect();
  });

  it( 'should connect with password', done => {
    const { domain, auth: { password, login } } = config,
      client = new AmoCRM({
        domain,
        auth: {
          password, login
        }
      });
    client
      .connect()
      .then( isConnected => {
        expect( isConnected ).toBe( true );
        done();
      });
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
      });
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
      .then( isConnected => {
        expect( isConnected ).toBe( false );
        done();
      });
  });
});
