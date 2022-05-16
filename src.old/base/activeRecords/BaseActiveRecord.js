class BaseActiveRecord {
  /**
   * @param resource {RemovableEntityResource}
   * @param attributes {object}
   */
  constructor( resource, attributes = {}) {
    this._resource = resource;
    this._attributes = Object.assign({}, attributes );
    this._isRemoved = false;
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

  hasAttribute( attribute ) {
    return this._attributes.hasOwnProperty( attribute );
  }

  getAttribute( attribute ) {
    return this._attributes[ attribute ];
  }

  isNew() {
    return this._attributes.id === undefined;
  }

  isRemoved() {
    return this._isRemoved;
  }
}

export default BaseActiveRecord;
