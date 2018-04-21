export default class Updatable {
  update( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.update( data );
  }
}
