/**
 * @file    服务器端启用babel转译的脚本，使得在NodeJS中可以使用ES6/7的语法
 */

var fs = require('fs');

// 读取babel配置对象
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch(err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

// 启用babel转译
require('babel-core/register')(babelrcObject);
