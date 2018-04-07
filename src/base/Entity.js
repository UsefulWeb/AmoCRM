'use strict';

class Entity {
  /**
   * @param resource {EntityResource}
   * @param attributes {object}
   */
  constructor( resource, attributes = {}) {
    this._resource = resource;
    this._attributes = attributes;
  }

  set attributes( attributes ) {
    this._attributes = attributes;
  }

  get attributes() {
    return this._attributes;
  }

  removeAttribute( attribute ) {
    delete this._attributes[ attribute ];
  }

  setAttribute( attribute, value ) {
    this._attributes[ attribute ] = value;
    return this;
  }

  getAttribute( attribute ) {
    return this._attributes[ attribute ];
  }

  save() {
    return this.isNew() ? this.insert() : this.update();
  }

  isNew() {
    return this._attributes.id === undefined;
  }

  fetch() {
    if ( this.isNew()) {
      throw new Error( 'Entity must exists for using Entity.fetch()!' );
    }
    return this._resource
      .findById( this._attributes.id )
      .then( response => {
        this._attributes = response.getFirstItem();
        return this;
      });
  }

  insert() {
    return this._resource
      .insert([ this._attributes ])
      .then( response => {
        const attributes = response.getFirstItem();
        this._attributes.id = attributes.id;
        return this;
      });
  }

  update() {
    return this._resource
      .update([ this._attributes ])
      .then( response => this );
  }

  remove() {
    return this._resource
      .remove([ this._attributes ])
      .then( response => this );
  }
}

export default Entity;
