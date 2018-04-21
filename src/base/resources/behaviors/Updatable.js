class Updatable {

  update( ids = []) {
    const { path, updatePath } = this.constructor;
    return this.request( 'POST', updatePath || path, {
      update: ids
    });
  }
}

export default Updatable;
