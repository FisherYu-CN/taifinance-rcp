/**
 * @file    开发环境下webpack及相关插件详细配置
 */

require('babel-polyfill');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPluginConfig = require('./webpack-isomorphic-tools-configuration');

// 获取工程根路径与资源路径
var projectRootPath = path.resolve(__dirname, '..');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// 加载webpack-isomorphic-tools插件配置
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsPluginConfig);

// 加载babel配置文件
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch(err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

// 根据配置信息，构建babel loader的查询字符串
var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// 开发环境中需要babel的react-transform插件，以支持对react组件的热重载
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

reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
});

// 获取主机名及端口号
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

// 开发环境Webpack配置
module.exports = {

    // 开发工具使用内联的source-map
    devtool: 'inline-source-map',

    // 解析入口文件的根路径
    context: projectRootPath,

    // 入口文件
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            'bootstrap-sass!./src/theme/bootstrap.config.js',
            'font-awesome-webpack!./src/theme/font-awesome.config.js',
            './src/client.js'
        ]
    },

    // 编译后的输出目录
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/dist/'
    },

    // 模块文件使用的loader配置
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'},
            {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
        ]
    },

    // 显示整个编译的过程
    progress: true,

    // 查找模块文件的目录以及后缀名配置
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },

    // webpack插件定义
    plugins: [

        // 热重载插件
        new webpack.HotModuleReplacementPlugin(),

        // 忽略相关文件
        new webpack.IgnorePlugin(/webpack-stats\.json$/),

        // 定义全局变量
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true  // <-------- 可以在此禁用redux-devtools
        }),

        // 开发模式的webpack-isomorphic-tools插件
        webpackIsomorphicToolsPlugin.development()
    ]
};
