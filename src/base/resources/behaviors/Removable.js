class Removable {

  update( ids = []) {
    const { path, deletePath } = this.constructor;
    return this.request( 'POST', deletePath || path, {
      update: ids
    });
  }
}

export default Removable;
