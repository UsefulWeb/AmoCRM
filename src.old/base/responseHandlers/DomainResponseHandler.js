import ResponseHandler from './ResponseHandler';
import { parseString } from 'xml2js';

class DomainResponseHandler extends ResponseHandler {

  toJSON( options ) {
    const resonseData = this._response;
    if ( !resonseData ) {
      return Promise.resolve({});
    }
    if ( options.dataType === 'xml' ) {
      return new Promise(( resolve, reject ) => {
        parseString( resonseData, ( err, data ) => {
          if ( err ) {
            return reject( err );
          }
          resolve( data );
        });
      });
    }

    let data;

    try {
      data = JSON.parse( resonseData );
    } catch ( e ) {
      throw  Error( `cannot parse JSON: ${resonseData}` );
    }
    return Promise.resolve({
      info: this._responseInfo,
      data
    });
  }
}

export default DomainResponseHandler;
