class Filterable {

  filterByTerm( term ) {
    const criteria = {
      term
    };
    return this._resource.filter( criteria )
      .then( response => this.afterFilter( response ));
  }

  filter( query, params ) {
    const criteria = {
      filter: query,
      useFilter: 'y'
    };
    return this._resource.filter( criteria, params )
      .then( response => this.afterFilter( response ));
  }

  afterFilter( response ) {
    return response.getItems();
  }

  filterByAttributes( query, params ) {
    return this.filter( query, params )
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

  filterByCustomFields( query, params ) {
    return this.filter({
      filter: {
        cf: query
      }
    }, params )
      .then( response => this.afterFilterByAttributes( response ));
  }

  filterByCustomField( id, value, params ) {
    return this.filterByCustomFields({
      [ id ]: value
    }, params );
  }

  findByTerm( term, params ) {
    return this.filterByTerm( term, params )
      .then( items => this.afterFindByAttributes( items ));
  }

  findByAttributes( query, params ) {
    return this.filterByAttributes( query, params )
      .then( items => this.afterFindByAttributes( items ));
  }

  afterFindByAttributes( items ) {
    const ids = items.map( item => item.id );
    return this.find({
      id: ids
    });
  }

  findByCustomFields( query, params ) {
    return this.filterByCustomFields( query, params )
      .then( items => this.afterFindByAttributes( items ));
  }

  findByCustomField( id, value, params ) {
    return this.filterByCustomField( id, value, params )
      .then( items => this.afterFindByAttributes( items ));
  }
}

export default Filterable;
