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
    this.ELEMENT_TYPE = TaskResource.ELEMENT_TYPES;
    this.TASK_TYPE = TaskResource.TASK_TYPES;
  }
}

export default TaskFactory;
