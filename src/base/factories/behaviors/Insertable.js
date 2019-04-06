export default class Insertable {
  insert( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.insert( data )
      .then( response => {
        const newData = response.getItems();
        this.updateActiveRecords( rawData, newData );
        return response;
      });
  }
}
