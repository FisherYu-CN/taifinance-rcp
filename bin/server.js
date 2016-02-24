/**
 * @file    整个应用服务器的入口，主要完成一些启动服务前的准备工作，比如在node端启用babel转译，
 *          定义全局变量以及在开发环境中启用piping进行文件监控等等。
 */

require('../server.babel');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

// 定义全局常量
global.__CLIENT__ = false;  // 是否是客户端
global.__SERVER__ = true;   // 是否是服务端
global.__DISABLE_SSR__ = false; // 是否禁用服务端渲染
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'; // 是否是开发环境

// 开发模式下启用piping监视文件变更
if (__DEVELOPMENT__) {
    var piping = require('piping');
    if (!piping({ hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i })) {
        return;
    }
}

// 初始化全局webpack-isomorphic-tools插件并调用src/server.js启动服务器
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools-configuration');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
    .development(__DEVELOPMENT__)
    .server(rootDir, function() {
        require('../src/server');
    });
