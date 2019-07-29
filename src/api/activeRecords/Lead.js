'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import HasNotes from '../../base/activeRecords/behaviors/HasNotes';
import HasTasks from '../../base/activeRecords/behaviors/HasTasks';

import HasContacts from './behaviors/Lead/HasContacts';
import HasCompany from '../../base/activeRecords/behaviors/HasCompany';

class Lead extends EntityActiveRecord {
  static behaviors = [
    new Removable,
    new HasNotes,
    new HasTasks,
    new HasContacts,
    new HasCompany
  ];
}

export default Lead;
