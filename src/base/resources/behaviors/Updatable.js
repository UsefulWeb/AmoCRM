class Updatable {

  update( ids = []) {
    const { path, updatePath } = this.constructor;
    return this.request( 'PATCH', updatePath || path, {
      update: ids
    });
  }
}

export default Updatable;
