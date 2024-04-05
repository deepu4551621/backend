module.exports = {
    resolve: {
        fallback: {
          process:false,
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          path: require.resolve('path-browserify'),
          net: require.resolve('@davedoesdev/node-net'),
          querystring: require.resolve('querystring-es3'),
          buffer: require.resolve('buffer'),
          async_hooks: require.resolve('async_hooks'),
          vm:false
        }
      }      
};
