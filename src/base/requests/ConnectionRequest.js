const ConnectionRequest = function ConnectionRequest( auth ) {
    const handler = ( method, url, data, options ) => {
        return request({
          url,
          data,
          method,
          options,
          auth
        });
      },
      requestWithMethod = method => handler.bind( null, method ),
      get = requestWithMethod( 'GET' ),
      post = requestWithMethod( 'POST' ),
      patch = requestWithMethod( 'PATCH' );

    Object.assign( handler, {
      get,
      post,
      patch
    });

    return handler;
  },
  request = params => {
    const {
      auth,
      method,
      url,
      options = {},
      data
    } = params;
    return auth.request( url, data, method, options );
  };

export default ConnectionRequest;
