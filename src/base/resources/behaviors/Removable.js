class Removable {

  remove( ids = []) {
    const { path, deletePath } = this.constructor;
    return this.request( 'POST', deletePath || path, {
      delete: ids
    });
  }
}

export default Removable;
