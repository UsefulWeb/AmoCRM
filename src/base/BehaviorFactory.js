class BehaviorFactory {

  static assignBehaviors( target, behaviors ) {
    const info = this.mergeBehaviorsInfo( ...behaviors );
    Object.assign( target, info.methods );
    Object.defineProperties( target, info.descriptors );
  }

  static mergeBehaviorsInfo( ...behaviors ) {
    const getProp = prop => obj => obj[ prop ],
      getObjectsProps = ( objs, prop ) => objs.map( getProp( prop )),
      mergeByProp = ( prop, ...objs ) =>
        Object.assign( ...getObjectsProps( objs, prop )),
      info = {
        methods: {},
        descriptors: {}
      };

    return behaviors.reduce(( target, behavior ) => {
      const info = this.getBehaviorInfo( behavior );
      mergeByProp( 'methods', target, info );
      mergeByProp( 'descriptors', target, info );
      return target;
    }, info );
  }

  static getBehaviorInfo( behavior ) {
    return {
      methods: this.getBehaviorMethods( behavior ),
      descriptors: this.getBehaviorDescriptors( behavior )
    };
  }

  static getBehaviorMethods( behavior ) {
    const proto = Object.getPrototypeOf( behavior ),
      isNotConstructor = property => property !== 'constructor',
      data = {},
      methods = Object.getOwnPropertyNames( proto );

    methods
      .filter( property => isNotConstructor( property ))
      .forEach( methodName => {
        data[ methodName ] = behavior[ methodName ];
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
