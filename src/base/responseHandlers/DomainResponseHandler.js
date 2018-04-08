import ResponseHandler from './ResponseHandler';
import { parseString } from 'xml2js';

class DomainResponseHandler extends ResponseHandler {

  toJSON( options ) {
    if ( !this._response ) {
      return Promise.resolve({});
    }
    if ( options.dataType === 'xml' ) {
      return new Promise(( resolve, reject ) => {
        parseString( this._response, ( err, data ) => {
          if ( err ) {
            return reject( err );
          }
          resolve( data );
        });
      });
    }

    let data;

    try {
      data = JSON.parse( this._response );
    } catch ( e ) {
      throw  Error( `cannot parse JSON: ${this._response}` );
    }

    return Promise.resolve( data );
  }
}

export default DomainResponseHandler;
