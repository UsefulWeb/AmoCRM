import BaseActiveRecord from '../../base/activeRecords/BaseActiveRecord';

export default class IncomingLead extends BaseActiveRecord {

  insertAsSIP( newAttributes ) {
    Object.assign( this._attributes, newAttributes );
    return this._resource
      .insertAsSIP([ this._attributes ]);
  }

  insertAsFormData( newAttributes ) {
    Object.assign( this._attributes, newAttributes );
    return this._resource
      .insertAsFormData([ this._attributes ]);
  }

  accept( data = {}) {
    const { uid } = this._attributes,
      params = Object.extend( data, {
        accept: [ uid ]
      });

    return this._resource
      .accept( params );
  }

  decline( data = {}) {
    const { uid } = this._attributes,
      params = Object.extend( data, {
        accept: [ uid ]
      });
    return this._resource
      .decline( params );
  }
}
