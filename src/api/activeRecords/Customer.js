'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import Notable from "../../base/activeRecords/behaviors/Notable";
import Taskable from "../../base/activeRecords/behaviors/Taskable";

class Customer extends Entity {
  static behaviors = [ new Removable, new Notable, new Taskable ];
}

export default Customer;
