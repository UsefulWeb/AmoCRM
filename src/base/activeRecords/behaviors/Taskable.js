import factories from "../../../api/factories";
import TaskResource from "../../../api/resources/TaskResource";

class Taskable {
  get tasks() {
    return {
      add: task => this.addTask( task ),
      get: params => this.getTasks( params )
    };
  };

  addTask( task ) {
    if ( !note.isNew()) {
      throw new Error( 'task must not exists!' );
    }
    const { TASK_ELEMENT_TYPE } = this._resource.constructor;
    task.element_type = TASK_ELEMENT_TYPE;
    task.element_id = this._attributes.id;
    return task.save();
  }

  getTasks( params ) {
    const factory = factories.Task,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      resourceConstructor = resource.constructor,
      { TASK_ELEMENT_TYPE } = resourceConstructor,
      type = TaskResource.getElementType( TASK_ELEMENT_TYPE ),
      criteria = {
        ...params,
        type,
        element_id: this._attributes.id
      };

    return factoryInstance.find( criteria );
  }
}

export default Taskable;
