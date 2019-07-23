export default class Findable {
  find( query ) {
    return this._resource.find( query )
      .then( response => this.afterFind( response ));
  }

  findOne( query ) {
    const criteria = Object.assign({}, query, {
      limit_rows: 1
    });
    return this._resource.find( criteria )
      .then( response => this.afterFindOne( response ));
  }

  afterFindOne( response ) {
    const attributes = response.getFirstItem();
    if ( !attributes ) {
      return;
    }
    return this.create( attributes );
  }

  afterFind( response ) {
    const items = response.getItems();
    return this.from( items );
  }
}
