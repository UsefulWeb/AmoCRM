'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import Notable from "../../base/activeRecords/behaviors/Notable";
import HasElementByField from "../../base/activeRecords/behaviors/HasElementByField";

class Task extends Entity {
  static behaviors = [ new Removable, new Notable, new HasElementByField( 'TASK_ELEMENT_TYPE' ) ];
}

export default Task;
