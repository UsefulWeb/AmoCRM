'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import HasNotes from '../../base/activeRecords/behaviors/HasNotes';
import HasTasks from '../../base/activeRecords/behaviors/HasTasks';
import HasCustomers from "./behaviors/Contact/HasCustomers";
import HasCompany from "../../base/activeRecords/behaviors/HasCompany";

class Contact extends EntityActiveRecord {
  static behaviors = [
    new Removable,
    new HasNotes,
    new HasTasks,
    new HasCustomers,
    new HasCompany
  ];
}

export default Contact;
