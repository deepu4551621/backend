module.exports = {
    resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          path: require.resolve('path-browserify'),
          net: require.resolve('@davedoesdev/node-net'),
          querystring: require.resolve('querystring-es3'),
          buffer: require.resolve('buffer'),
        }
      }      
};
