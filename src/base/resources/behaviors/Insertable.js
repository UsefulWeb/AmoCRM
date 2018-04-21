class Insertable {

  insert( data=[]) {
    const { insertPath, path } = this.constructor;
    return this.request( 'POST', insertPath || path, {
      add: data
    });
  }
}

export default Insertable;
