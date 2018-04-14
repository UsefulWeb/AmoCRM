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

  static createFrom( activeRecordInstance, attributes={} ) {
    const resourceConstructor = this._resource.constructor,
      resource = resourceConstructor.createFrom( this._resource );

    return new activeRecordInstance.constructor( resource, attributes );
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
}

export default BaseActiveRecord;
