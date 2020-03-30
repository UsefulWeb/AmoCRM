'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import HasNotes from "../../base/activeRecords/behaviors/HasNotes";
import HasTasks from "../../base/activeRecords/behaviors/HasTasks";

/**
 * @mixes Removable
 * @mixes HasNotes
 * @mixes HasTasks
 */
class Company extends EntityActiveRecord {
  static behaviors = [ new Removable, new HasNotes, new HasTasks ];
}

export default Company;
