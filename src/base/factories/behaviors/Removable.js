class Removable {
  remove( rawData ) {
    const ids = this.getDataIdentifiers( rawData );
    return this._resource.remove( ids );
  }
}

export default Removable;
