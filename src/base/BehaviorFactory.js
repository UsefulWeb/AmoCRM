class BehaviorFactory {

  static assignBehaviors( target, behaviors ) {
    const info = this.mergeBehaviorsInfo( ...behaviors );
    Object.assign( target, info.prototypeProperties );
    Object.assign( target, info.properties );
    Object.defineProperties( target, info.descriptors );
  }

  static mergeBehaviorsInfo( ...behaviors ) {
    const getProp = prop => obj => obj[ prop ],
      getObjectsProps = ( objs, prop ) => objs.map( getProp( prop )),
      mergeByProp = ( prop, ...objs ) =>
        Object.assign( ...getObjectsProps( objs, prop )),
      info = {
        prototypeProperties: {},
        descriptors: {},
        properties: {}
      };

    return behaviors.reduce(( target, behavior ) => {
      const info = this.getBehaviorInfo( behavior );
      mergeByProp( 'prototypeProperties', target, info );
      mergeByProp( 'descriptors', target, info );
      mergeByProp( 'properties', target, info );
      return target;
    }, info );
  }

  static getBehaviorInfo( behavior ) {
    return {
      prototypeProperties: this.getBehaviorPrototypeProperties( behavior ),
      descriptors: this.getBehaviorDescriptors( behavior ),
      properties: this.getBehaviorProperties( behavior ),
    };
  }

  static getBehaviorProperties( behavior ) {
    return Object.keys( behavior ).reduce(( target, property ) => {
      target[ property ] = behavior[ property ];
      return target;
    }, {});
  }

  static getBehaviorPrototypeProperties( behavior ) {
    const proto = Object.getPrototypeOf( behavior ),
      isNotConstructor = property => property !== 'constructor',
      data = {},
      properties = Object.getOwnPropertyNames( proto );

    properties
      .filter( property => isNotConstructor( property ))
      .forEach( property => {
        data[ property ] = behavior[ property ];
      });

    return data;
  }

  static getBehaviorDescriptors( behavior ) {
    const proto = Object.getPrototypeOf( behavior ),
      descriptors = Object.getOwnPropertyDescriptors( proto ),
      data = {};

    return Object.keys( descriptors ).reduce(( target, name ) => {
      const descriptor = descriptors[ name ];
      if ( descriptor.get || descriptor.set ) {
        target[ name ] = descriptor;
      }
      return target;
    }, data );
  }
}

export default BehaviorFactory;
