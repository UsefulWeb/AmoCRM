export default class Findable {
  find( query ) {
    return this._resource.find( query )
      .then( response => this.afterFind( response ));
  }

  afterFind( response ) {
    const items = response.getItems();
    return items.map( attributes => this.create( attributes ));
  }
}
