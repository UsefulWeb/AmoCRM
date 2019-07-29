'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import Notable from '../../base/activeRecords/behaviors/Notable';
import Taskable from '../../base/activeRecords/behaviors/Taskable';

import HasContacts from './behaviors/Lead/HasContacts';
import HasCompany from '../../base/activeRecords/behaviors/HasCompany';

class Lead extends EntityActiveRecord {
  static behaviors = [
    new Removable,
    new Notable,
    new Taskable,
    new HasContacts,
    new HasCompany
  ];
}

export default Lead;
