/**
 * @file    生产环境下webpack及相关插件详细配置
 */

require('babel/polyfill');

var path = require('path');
var webpack = require('webpack');
var strip = require('strip-loader');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPluginConfig = require('./webpack-isomorphic-tools-configuration');

// 获取工程根路径与资源路径
var projectRootPath = path.resolve(__dirname, '..');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// 加载webpack-isomorphic-tools插件配置
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsPluginConfig);

// 生产环境Webpack配置
module.exports = {

    // 开发工具使用单独的source-map文件
    devtool: 'source-map',

    // 解析入口文件的根路径
    context: projectRootPath,

    // 入口文件
    entry: {
        'main': [
            'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
            'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
            './src/client.js'
        ]
    },

    // 编译后的输出目录
    output: {
        path: assetsPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/dist/'
    },

    // 模块文件使用的loader配置
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
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

        // 清理包含资源文件的文件夹
        new CleanPlugin([assetsPath], { root: projectRootPath }),

        // 将提取到的CSS样式保存在单独的文件中，而不是使用内联的<style/>标签
        new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),

        // 忽略所有开发环境配置信息
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // 定义全局变量
        new webpack.DefinePlugin({

            // 基本变量
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,

            // 设定Node环境变量为生产模式，可以有效减少客户端类库文件的大小
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // 去除重复的文件
        new webpack.optimize.DedupePlugin(),

        // 使用出现顺序来给module和chunk的id赋值，id可预测，也减少总体文件大小
        new webpack.optimize.OccurenceOrderPlugin(),

        // 最小化输出的chunk中的JS代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // 生产模式的webpack-isomorphic-tools插件
        webpackIsomorphicToolsPlugin
    ]
};
