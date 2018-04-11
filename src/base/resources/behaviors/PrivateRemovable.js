class PrivateRemovable {
  remove( ids ) {
    const multiaction_type = this.constructor.DELETE_MULTIACTION_TYPE;
    return this.multiactions( ids, {
      data: {
        ACTION: 'DELETE'
      }
    }, multiaction_type );
  }
}

export default PrivateRemovable;
