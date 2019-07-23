class Filterable {

  filterByTerm( term ) {
    const criteria = {
      term
    };
    return this._resource.filter( criteria )
      .then( response => this.afterFilter( response ));
  }

  filter( query ) {
    const criteria = {
      filter: query,
      useFilter: 'y'
    };
    return this._resource.filter( criteria )
      .then( response => this.afterFilter( response ));
  }

  afterFilter( response ) {
    return response.getItems();
  }

  filterByAttributes( query ) {
    return this.filter( query )
      .then( response => this.afterFilterByAttributes( response ));
  }

  afterFilterByAttributes( items ) {
    return items.map( item => {
      const attributes = {
        id: item.id,
        name: item.name.text
      };
      const entity = this.of( attributes );

      entity.markAsIncomplete( false );

      return entity;
    });
  }

  filterByCustomFields( query ) {
    return this.filter({
      filter: {
        cf: query
      }
    })
      .then( response => this.afterFilterByAttributes( response ));
  }

  filterByCustomField( id, value ) {
    return this.filterByCustomFields({
      [ id ]: value
    });
  }

  findByTerm( term ) {
    return this.filterByTerm( term )
      .then( items => this.afterFindByAttributes( items ));
  }

  findByAttributes( query ) {
    return this.filterByAttributes( query )
      .then( items => this.afterFindByAttributes( items ));
  }

  afterFindByAttributes( items ) {
    const ids = items.map( item => item.id );
    return this.find({
      id: ids
    });
  }

  findByCustomFields( query ) {
    return this.filterByCustomFields( query )
      .then( items => this.afterFindByAttributes( items ));
  }

  findByCustomField( id, value ) {
    return this.filterByCustomField( id, value )
      .then( items => this.afterFindByAttributes( items ));
  }
}

export default Filterable;
