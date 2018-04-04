'use strict';
import AmoConnection from './AmoConnection';

class AmoCRM {
  constructor( options = {}) {
    if ( 'connection' in options ) {
      const connection = new AmoConnection( options.connection );
      this.setConnection( connection );
    }
  }

  set connection( connection ) {
    this._connection = connection;
    return this;
  }

  connect() {
    return this.connection.establish();
  }
}

module.exports = AmoCRM;
