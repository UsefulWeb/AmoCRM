import IncomingLead from '../activeRecords/IncomingLead';
import IncomingLeadResource from '../resources/IncomingLeadResource';
import ResourceFactory from "../../base/factories/ResourceFactory";

class IncomingLeadFactory extends ResourceFactory {
  static activeRecordClass = IncomingLead;
  static resourceClass = IncomingLeadResource;
  static behaviors = [];
}

export default IncomingLeadFactory;
