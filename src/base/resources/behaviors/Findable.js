class Findable {

  find( query = {}) {
    const { path, getPath } = this.constructor;
    return this.request( 'GET', getPath || path, query );
  }
}

export default Findable;
