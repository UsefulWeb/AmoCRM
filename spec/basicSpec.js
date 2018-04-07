import AmoCRM from '../src/AmoCRM';

describe( 'Entry Point: AmoCRM class', () => {
  it( 'should create instance', () => {
    expect(() => new AmoCRM ).toThrowError( 'Wrong connection configuration' );
  });
});
