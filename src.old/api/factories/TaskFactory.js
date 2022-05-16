import EntityFactory from '../../base/factories/EntityFactory';
import Task from '../activeRecords/Task';
import TaskResource from '../resources/TaskResource';

class TaskFactory extends EntityFactory {
  static entityClass = Task;
  static resourceClass = TaskResource;
}

export default TaskFactory;
