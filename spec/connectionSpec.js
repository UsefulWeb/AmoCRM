import AmoCRM from '../dist/AmoCRM';
import config from './support/config';


describe( 'AmoCRM connection', () => {

  it( 'should connect with hash', done => {
    const { domain, auth: { hash, login }} = config,
      client = new AmoCRM({
        domain,
        auth:{
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

  it( 'should connect with password', done => {
    const { domain, auth: { password, login }} = config,
      client = new AmoCRM({
        domain,
        auth:{
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
    const { domain, auth: { hash, login }} = config,
      client = new AmoCRM({
        domain,
        auth:{
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
    const { auth: { hash, login }} = config,
      client = new AmoCRM({
        domain: 'error',
        auth:{
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
