import factories from "../../../api/factories";
import TaskResource from "../../../api/resources/TaskResource";

class HasTasks {

  get Task() {
    if ( this.isNew()) {
      throw new Error( 'record must exists!' );
    }
    const behavior = this;
    return function ( attributes={}) {
      const Task = factories.Task.createFromResource( behavior._resource ),
        task = Task.create( attributes );
      return behavior.prepareTask( task );
    }
  }

  addTasks( tasks ) {
    const { factory } = tasks[ 0 ],
      data = tasks.map( task => this.prepareTask( task ));
    return factory.insert( data );
  }

  prepareTask( task ) {
    if ( !task.isNew()) {
      throw new Error( 'task must not exists!' );
    }
    const { TASK_ELEMENT_TYPE } = this._resource.constructor;
    task.element_type = TASK_ELEMENT_TYPE;
    task.element_id = this._attributes.id;
    return task;
  }

  getTasks( params={}) {
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

export default HasTasks;
