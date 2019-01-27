class EventResource {
  constructor() {
    this._events = {};
  }

  proxyEventHandlers( prefix, events, target ) {
    events.forEach( event => target.on( event, ( ...args ) => {
      const selfEvent = `${prefix}:${event}`;
      this.triggerEvent( selfEvent, ...args );
    }));
  }

  on( event, handler ) {
    if ( !this._events[ event ]) {
      this._events[ event ] = [];
    }

    this._events[ event ].push( handler );
    return this;
  }

  off( event, handler ) {
    if ( !event ) {
      this._events = [];
      return this;
    }

    if ( !handler ) {
      delete this._events[ event ];
    }

    const index = this._events[ event ].findIndex( handler );

    if ( !index ) {
      return this;
    }

    this._events[ event ].splice( index, 1 );
    return this;
  }

  triggerEvent( event, ...args ) {
    if ( !this._events[ event ]) {
      return;
    }

    this._events[ event ].forEach( handler => handler( ...args ));
  }
}

module.exports = EventResource;
