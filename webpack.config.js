/**
 * Created by bykovdenis on 11.03.17.
 */
require('babel-polyfill');
// Установка режима работы сборщика
const NODE_ENV = process.env.NODE_ENV || 'development';
// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var fs = require('fs');
// Плагин очистки директории
const CleanWebpackPlugin = require('clean-webpack-plugin');
// для плагина формирования css в отдельные файлы
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin'); // копирование файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');  // для плагина формирования html из шаблонизатора
// dashbord
var DashboardPlugin = require('webpack-dashboard/plugin');

const srcDir = 'src';
const outputDir = 'build/';

const assetsPath = path.resolve(__dirname, '../build');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  context: __dirname + '/src/',
  entry: {
    bundle: './js',
    styles: './css'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
  },
  // Определение расширений файлов по-умолчанию
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.css', '.html', '.jade']
  },
  resolveLoader: {
    modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    extensions: [".webpack-loader.js", ".web-loader.js", ".babel-loader.js", ".loader.js", ".js"]
  },
  // Настройка плагинов
  plugins: [
    // генерация html файла на основе шаблонизатора jade
    new HtmlWebpackPlugin({
      title: 'Title',
      template: 'jade/index.jade',
      inject: true,
      minify:{
        collapseWhitespace: false // Переносить теги на новую строку
      }
    }),
    new DashboardPlugin(),
    // Формировать отдельный css файл
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    // это функциональность webpack, предназначенная не только для быстрой подгрузки изменений на машине разработчика, но и для обновления сайтов в production
    new webpack.HotModuleReplacementPlugin()
    // Плагин копирования файлов
    /*
    new CopyWebpackPlugin([{
      from: path.resolve(srcDir+'/html/', '.html'), to: ''
    }])
    */
  ],
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    }, {
      test: /\.jade$/,
      loader: "jade-loader",
      query: {pretty: true}
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
    }]
  }
};

if(NODE_ENV == 'refresh') {
  module.exports.plugins.push(
    // Чистить папку с билдом перед каждой сборкой
    new CleanWebpackPlugin(outputDir, {
      root: __dirname,
      verbose: true,
      dry: false,
    })
  );
}