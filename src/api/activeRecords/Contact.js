'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import Notable from '../../base/activeRecords/behaviors/Notable';
import Taskable from '../../base/activeRecords/behaviors/Taskable';
import HasFields from '../../base/activeRecords/behaviors/HasFields';
import factories from '../factories';

class Contact extends EntityActiveRecord {
  static behaviors = [ new Removable, new Notable, new Taskable, new HasFields ];

  get customers() {
    return {
      add: customer => this.addCustomer( customer ),
      get: params => this.getCustomers( params )
    };
  }

  addCustomer( customer ) {
    customer.contact_id = this._attributes.id;
    return customer.save();
  }

  getCustomers( params ) {
    const factory = factories.Customer,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      criteria = {
        ...params,
        contact_id: this._attributes.id
      };

    return factoryInstance.find( criteria );
  }
}

export default Contact;
