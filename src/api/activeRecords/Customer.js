'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import Notable from "../../base/activeRecords/behaviors/Notable";
import Taskable from "../../base/activeRecords/behaviors/Taskable";
import HasFields from "../../base/activeRecords/behaviors/HasFields";
import factories from '../factories';

class Customer extends EntityActiveRecord {
  static behaviors = [ new Removable, new Notable, new Taskable, new HasFields ];

  getContact() {
    const factory = factories.Contact,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource );

    return factoryInstance.findById( this._attributes.contact_id );
  }
}

export default Customer;
