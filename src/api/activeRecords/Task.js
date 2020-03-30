'use strict';

import EntityActiveRecord from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";
import HasNotes from "../../base/activeRecords/behaviors/HasNotes";
import HasElementByField from "../../base/activeRecords/behaviors/HasElementByField";

/**
 * @mixes Removable
 * @mixes HasNotes
 * @mixes HasElementByField
 */
class Task extends EntityActiveRecord {
  static behaviors = [
    new Removable,
    new HasNotes,
    new HasElementByField( 'TASK_ELEMENT_TYPE' )
  ];
}

export default Task;
