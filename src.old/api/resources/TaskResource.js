import schema from '../../routes/v2';
import RemoveableEntityResource from '../../base/resources/RemovableEntityResource';

class TaskResource extends RemoveableEntityResource {
  static path = schema.entities.tasks.path;
  static deletePath = schema.entities.tasks.deletePath;
}

export default TaskResource;
