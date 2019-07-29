'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import Notable from '../../base/activeRecords/behaviors/Notable';
import Taskable from '../../base/activeRecords/behaviors/Taskable';
import HasCustomers from "./behaviors/Contact/HasCustomers";
import HasCompany from "../../base/activeRecords/behaviors/HasCompany";

class Contact extends EntityActiveRecord {
  static behaviors = [
    new Removable,
    new Notable,
    new Taskable,
    new HasCustomers,
    new HasCompany
  ];
}

export default Contact;
