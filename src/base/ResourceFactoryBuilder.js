import factories from '../api/factories';

class ResourceFactoryBuilder {
  static factories = factories;

  constructor( request ) {
    this._request = request;
  }

  getResourceFactories() {
    return Object.keys( factories ).reduce(( factories, factoryName ) => {
      factories[ factoryName ] = this.createResourceFactory( factoryName );
      return factories;
    }, {});
  }

  createResourceFactory( name ) {
    const factory = new this.constructor.factories[ name ]( this._request ),
      handler = this.createFactoryHandler( factory ),
      constructor = function constructor() {};
    return new Proxy( constructor, handler );
  }

  createFactoryHandler( factory ) {
    return {
      /**
       * @param target {EntityFactory}
       * @param attributes {object}
       */
      construct: ( target, attributes ) => factory.create( ...attributes ),
      get: ( target, attribute ) => factory[ attribute ]
    };
  }
}

export default ResourceFactoryBuilder;
