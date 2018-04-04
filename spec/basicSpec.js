import AmoCRM from '../src/AmoCRM';

describe( 'Entry Point: AmoCRM class', () => {
  it( 'should create instance', () => {
    const client = new AmoCRM;
    expect( client ).toBeDefined();
  });
  it( 'shouldnt connect without config', () => {
    const client = new AmoCRM;
    expect(() => client.connect()).toThrowError( 'client doesnt have any connection configuration' );
  });
});
