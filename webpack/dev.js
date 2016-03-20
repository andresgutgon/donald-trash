var path = require('path');
var webpack = require('webpack');
var config = require('./common')('development');

module.exports = function() {

  var entry = ['webpack-hot-middleware/client'].concat(config.entry);

  var plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);

  config.entry = entry;
  config.plugins = plugins;
  return config;
};
