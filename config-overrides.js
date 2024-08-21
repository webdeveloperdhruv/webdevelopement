const webpack = require('webpack');

module.exports = function override(config, env) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/")
  });

  config.resolve.fallback = fallback;

  return config;
};