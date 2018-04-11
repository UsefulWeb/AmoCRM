'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";

class Task extends Entity {
  static behaviors = [ new Removable ];
}

export default Task;
