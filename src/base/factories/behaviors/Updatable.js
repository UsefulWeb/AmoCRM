export default class Updatable {
  update( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.update( data )
      .then( response => {
        const newData = response.getItems();
        this.updateActiveRecords( rawData, newData );
        return response;
      });
  }
}
