import resources from '../../../api/resources';
import factories from '../../../api/factories';

export default class HasElementByField {
  constructor( resourceField ) {
    this._HasElementById__elementResourceField = resourceField;
  }

  getElementFactoryClassName() {
    const resourceNames = Object.keys( resources ),
      field = this._HasElementById__elementResourceField,
      value = this._attributes.element_type;

    for ( let i = 0, len = resourceNames.length; i < len; i++ ) {
      const name = resourceNames[ i ],
        resource = resources[ name ];
      if ( value === resource[ field ]) {
        return factories[ name ];
      }
    }
  }

  getElement() {
    if ( this.isNew()) {
      throw new Error( 'entity must exists!' );
    }
    const factoryClassName = this.getElementFactoryClassName(),
      factory = factoryClassName.createFromResource( this._resource );

    return factory.findById( this._attributes.element_id );
  }
}
