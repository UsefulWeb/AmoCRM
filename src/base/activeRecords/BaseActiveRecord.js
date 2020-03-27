import BehaviorFactory from '../BehaviorFactory';

class BaseActiveRecord {
  static behaviors = [];
  /**
   * @param resource {EntityResource}
   * @param attributes {object}
   */
  constructor( resource, attributes = {}) {
    this._resource = resource;
    this._attributes = Object.assign({}, attributes );
    this._isRemoved = false;
    BehaviorFactory.assignBehaviors( this, this.constructor.behaviors );
  }

  static isActiveRecord( item ) {
    return item instanceof this;
  }

  static createFrom( activeRecordInstance, attributes={} ) {
    const resourceConstructor = this._resource.constructor,
      resource = resourceConstructor.createFrom( this._resource );

    return new activeRecordInstance.constructor( resource, attributes );
  }

  set attributes( attributes ) {
    const { id } = this._attributes;
    this._attributes = attributes;
    if ( id ) {
      this._attributes.id = id;
    }
  }

  get attributes() {
    return this._attributes;
  }

  removeAttribute( attribute ) {
    delete this._attributes[ attribute ];
  }

  setAttributes( attributes ) {
    this.attributes = attributes;
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
}

export default BaseActiveRecord;
