import AmoCRM from '../dist/Client';

describe( 'Entry Point: Client class', () => {
  fit( 'should create instance', () => {
    expect(() => new AmoCRM ).to
  });
  it( 'should create instancewith error', () => {
    expect(() => new AmoCRM ).toThrowError( 'Wrong configuration' );
  });
});
