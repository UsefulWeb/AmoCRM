import IncomingLead from '../activeRecords/IncomingLead';
import IncomingLeadResource from '../resources/IncomingLeadResource';
import ResourceFactory from "../../base/factories/ResourceFactory";

class IncomingLeadFactory extends ResourceFactory {
  static activeRecordClass = IncomingLead;
  static resourceClass = IncomingLeadResource;
  static behaviors = [];

  insertAsSIP( data ) {
    return this._resource.insertAsSIP( data );
  }

  insertAsFormData( data ) {
    return this._resource.insertAsFormData( data );
  }

  accept( data ) {
    return this._resource.accept( data );
  }

  decline( data ) {
    return this._resource.decline( data );
  }
}

export default IncomingLeadFactory;
