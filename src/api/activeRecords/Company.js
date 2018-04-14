'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import Notable from "../../base/activeRecords/behaviors/Notable";

class Company extends Entity {
  static behaviors = [ new Removable, new Notable ];
}

export default Company;
