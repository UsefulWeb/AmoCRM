class PrivateRemovableById {
  removeById( id ) {
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

export default PrivateRemovableById;
