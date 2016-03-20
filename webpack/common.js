var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Based on enviroment put CSS inside webpack bundle
 * or extract into a css file
 *
 * @param {String} env
 * @return {String}
 */
function getCSSLoader(env) {
  var cssLocalIdentName = env === 'development' ?
        '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]';

  var styleLoader = 'style';
  var otherLoaders = 'css?modules&importLoaders=1&localIdentName=' + cssLocalIdentName + '!postcss';

  if (env === 'development') return styleLoader + '!' + otherLoaders;

  return ExtractTextPlugin.extract(styleLoader, otherLoaders);
}

module.exports = function(env) {
  return {
    devtool: 'source-map',

    entry: [
      './src/index'
    ],

    resolve: {
      root: [
        path.resolve('./src'),
      ]
    },

    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'bundle.[hash].js',
      publicPath: ''
    },

    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loader: 'babel',
          exclude: /node_moduless/,
          include: path.join(__dirname, '../src')
        },
        {
          test: /\.css$/,
          loader: getCSSLoader(env)
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ],
    },

    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')(),
      require('postcss-nested'),
      require('autoprefixer-core'),
    ],

    plugins: [
      new HtmlWebpackPlugin({
        favicon: './src/static/favicon.ico',
        title: 'Widget demo app',
        template: 'src/index.html',
        filename: 'index.html',
      }),
    ]
  };
};
