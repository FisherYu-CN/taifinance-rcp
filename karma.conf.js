/**
 * @file    webpack中配置karma来管理测试执行过程
 */

var webpack = require('webpack');

module.exports = function(config) {

    config.set({

        // 测试使用的浏览器
        browsers: ['PhantomJS'],

        // 在持续集成环境中，karma会启动并捕获所有配置的浏览器
        // 并一次性在所有浏览器运行所有的测试用例并返回结果
        singleRun: !!process.env.CONTINUOUS_INTEGRATION,

        // 使用mocha框架进行测试
        frameworks: ['mocha'],

        // 需要加载到浏览器中的文件
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'tests.webpack.js'
        ],

        // 使用webpack和sourcemap对需要测试的JS文件进行预处理
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },

        // 使用mocha来报告测试结果
        reporters: ['mocha'],

        // 测试过程中需要使用到的插件
        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader')
        ],

        // webpack相关配置
        webpack: {

            // 开发工具使用内联的source-map
            devtool: 'inline-source-map',

            // 模块文件使用的loader配置
            module: {
                loaders: [
                    { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
                    { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
                    { test: /\.json$/, loader: 'json-loader' },
                    { test: /\.less$/, loader: 'style!css!less' },
                    { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
                ]
            },

            // 查找模块文件的目录以及后缀名配置
            resolve: {
                modulesDirectories: ['src', 'node_modules'],
                extensions: ['', '.json', '.js']
            },

            // webpack插件定义
            plugins: [
                new webpack.IgnorePlugin(/\.json$/),
                new webpack.NoErrorsPlugin(),
                new webpack.DefinePlugin({
                    __CLIENT__: true,
                    __SERVER__: false,
                    __DEVELOPMENT__: true,
                    __DEVTOOLS__: false  // <-------- 此处禁用了redux-devtools
                })
            ]
        },

        // webpack开发中间件配置
        webpackServer: {
            noInfo: true
        }
    });
};
