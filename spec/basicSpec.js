import AmoCRM from '../dist/AmoCRM';

describe( 'Entry Point: AmoCRM class', () => {
  it( 'should create instance', () => {
    expect(() => new AmoCRM ).toThrowError( 'Wrong configuration' );
  });
});
