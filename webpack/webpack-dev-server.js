/**
 * @file    webpack开发服务器启动与配置脚本
 */

var Express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./dev.config');
var config = require('../src/config');

// 初始化webpack编译器
var compiler = webpack(webpackConfig);

// 从配置文件获取主机名与端口号
var host = config.host || 'localhost';
var port = (config.port + 1) || 3001;

// webpack开发中间件配置
var serverOptions = {
    contentBase: 'http://' + host + ':' + port,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
};

// 新建express服务器实例
var app = new Express();

// 添加webpack开发与热重载中间件
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

// 启动express服务器实例
app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  Webpack development server listening on port %s', port);
    }
});
