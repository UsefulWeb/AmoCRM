export default class Insertable {
  insert( rawData ) {
    const data = this.getDataAttributes( rawData );
    return this._resource.insert( data );
  }
}
