var webpack = require('webpack');

/*
 * --------
 *  CONFIG
 * --------
 */

var BUILD_ENV = process.env.BUILD_ENV || 'development';

var deployConfig;

try {
  deployConfig = require('./deploy.config.js')[BUILD_ENV] || {};
} catch (e) {
  console.log('WARNING: No deploy.config.js found.');
  deployConfig = {};
}

//replaces require('config') in application js files with the
//contents of source/config/<env>.js as defined by `clientConfig`
//key in the deployConfig file
var clientConfig = deployConfig.clientConfig || 'development';
var replaceConfig = new webpack.NormalModuleReplacementPlugin(
    /^config$/,
    __dirname + '/source/config/' + clientConfig + '.js'
);

var publicPath = '/dist/';


/*
 * -------
 *  SETUP
 * -------
 */

module.exports = {
  debug: deployConfig.debug,
  devtool: 'cheap-source-map',

  entry: {
    bundle: './source/init.js'
  },

  output: {
    path: __dirname + '/dist',
    filename: 'pn-finalists.min.js',
    publicPath: publicPath
  },

  module: {
    exprContextRecursive: false,
    exprContextCritical: false,

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ]
  },

  plugins: [
    replaceConfig
  ],

  postcss: function() {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('postcss-cssnext')(),
      require('cssnano')({safe: true}),
    ];
  },

};
