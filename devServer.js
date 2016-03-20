var path = require('path');
var express = require('express');
var webpack = require('webpack');
var historyApiFallback = require('connect-history-api-fallback');
var config = require('./webpack/dev')();

var app = express();

app.use(historyApiFallback({
  verbose: false,
}));

var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  stats: {
    chunks: false,
    colors: true
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
