import EntityResource from './EntityResource';

class RemovableEntityResource extends EntityResource {

  static deletePath;

  remove( ids ) {
    const multiaction_type = this.constructor.DELETE_MULTIACTION_TYPE;
    return this.multiactions( ids, {
      data: {
        ACTION: 'DELETE'
      }
    }, multiaction_type );
  }

  removeOne( id ) {
    const { deletePath } = this.constructor;
    if ( !deletePath ) {
      throw new Error( 'deletePath is not specified!' );
    }
    return this.request( 'POST', deletePath,
      {
        ID: id,
        ACTION: 'DELETE',
        pipeline: 'Y'
      },
      {
        formData: true
      }
    );
  }
}

export default RemovableEntityResource;
