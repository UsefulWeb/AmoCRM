export default class FindableById {

  findById( id ) {
    return this._resource.findById( id )
      .then( response => this.afterFindById( response ));
  }

  afterFindById( response ) {
    const attributes = response.getFirstItem();
    if ( !attributes ) {
      return;
    }
    return this.create( attributes );
  }
}
