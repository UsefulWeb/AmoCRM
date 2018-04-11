import EntityFactory from '../../base/factories/EntityFactory';
import Task from '../activeRecords/Task';
import TaskResource from '../resources/TaskResource';
import Removable from '../../base/factories/behaviors/Removable';

class TaskFactory extends EntityFactory {
  static entityClass = Task;
  static resourceClass = TaskResource;
  static behaviors = [ new Removable ];

  constructor( ...args ) {
    super( ...args );
    this.ELEMENT_TYPE = {
      CONTACT: 1,
      LEAD: 2,
      COMPANY: 3,
      CUSTOMER: 12
    };
  }
}

export default TaskFactory;
