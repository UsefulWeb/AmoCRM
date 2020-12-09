import ResponseHandler from './ResponseHandler';
import { parseString } from 'xml2js';

class DomainResponseHandler extends ResponseHandler {

  toJSON( options ) {
    const responseData = this._response;
    if ( !responseData ) {
      return Promise.resolve({});
    }
    if ( options.dataType === 'xml' ) {
      return new Promise(( resolve, reject ) => {
        parseString( responseData, ( err, data ) => {
          if ( err ) {
            return reject( err );
          }
          resolve( data );
        });
      });
    }

    let data;

    try {
      data = JSON.parse( responseData );
    } catch ( e ) {
      throw Error( `cannot parse JSON: ${responseData}` );
    }
    return Promise.resolve({
      info: this._responseInfo,
      data
    });
  }
}

export default DomainResponseHandler;
