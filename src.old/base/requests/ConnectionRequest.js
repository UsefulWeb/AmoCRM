const ConnectionRequest = function (connection ) {
  const handler = ( method, url, data, options ) => {
      return request({
        url,
        data,
        method,
        options,
        connection
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
};

const request = params => {
  const {
      connection,
      method,
      url,
      options = {},
      data
    } = params;
  return connection.request( url, data, method, options );
};

export default ConnectionRequest;
