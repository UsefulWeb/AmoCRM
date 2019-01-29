'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from '../../base/activeRecords/behaviors/Removable';
import Notable from '../../base/activeRecords/behaviors/Notable';
import Taskable from '../../base/activeRecords/behaviors/Taskable';

class Lead extends EntityActiveRecord {
  static behaviors = [ new Removable, new Notable, new Taskable ];
}

export default Lead;
