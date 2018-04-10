import EntityFactory from './EntityFactory';

class RemovableEntityFactory extends EntityFactory {
  remove( rawData ) {
    const ids = this.getDataIdentifiers( rawData );
    return this._resource.remove( ids );
  }

  removeById( id ) {
    return this._resource.removeById( id );
  }
}

export default RemovableEntityFactory;
