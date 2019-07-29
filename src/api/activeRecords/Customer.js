'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import HasNotes from "../../base/activeRecords/behaviors/HasNotes";
import HasTasks from "../../base/activeRecords/behaviors/HasTasks";
import factories from '../factories';

class Customer extends EntityActiveRecord {
  static behaviors = [ new Removable, new HasNotes, new HasTasks ];

  getContact() {
    const factory = factories.Contact,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource );

    return factoryInstance.findById( this._attributes.contact_id );
  }
}

export default Customer;
