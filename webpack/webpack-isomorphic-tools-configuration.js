/**
 * @file    webpack-isomorphic-tool插件作为webpack的补充，将Webpack所提供的针对所有
 *          资源文件统一的require机制移植到NodeJS的服务端，使得在服务端代码中也可以使用
 *          require()来引入其他模块或者资源，使得客户端与服务器端可以使用同样的代码，也
 *          就是所谓的isomorphic的概念。本文件提供了针对webpack-isomorphic-tool插件
 *          的基本配置。更多关于webpack-isomorphic-tool插件的信息，查看以下链接：
 *          https://github.com/halt-hammerzeit/webpack-isomorphic-tools
 */

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {

    // 当在资源类型中添加js后缀时，在启用debug模式下会引起奇怪的错误：
    //
    // [0] npm run start-prod exited with code 1
    // Sending SIGTERM to other processes..
    //
    // debug: true,

    assets: {
        // 图片资源文件
        images: {
            extensions: ['jpeg', 'jpg', 'png', 'gif'],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },

        // 字体资源文件
        fonts: {
            extensions: ['woff', 'woff2', 'ttf', 'eot'],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },

        // svg资源文件
        svg: {
            extension: 'svg',
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },

        // bootstrap资源文件
        // 整个bootstrap资源类型只在开发环境模式下使用一次，用在Html.js文件中。
        // 一个引用'./src/theme/bootstrap.config.js'的<style/>标签被创建时，
        // 上述<style/>标签可以减少开发模式下刷新页面的白屏时间。挂到js后缀的
        // require()不是最佳的处理方式，希望今后有更好的解决方案。
        bootstrap: {
            extension: 'js',
            include: ['./src/theme/bootstrap.config.js'],
            filter: function(module, regex, options, log) {
                function isBootstrapStyle(name) {
                    return name.indexOf('./src/theme/bootstrap.config.js') >= 0;
                }
                // 仅在开发环境模式中需要
                if (options.development) {
                    return isBootstrapStyle(module.name) && WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
                }
            },
            path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
            parser: WebpackIsomorphicToolsPlugin.css_loader_parser
        },

        // 样式资源文件
        style_modules: {
            extensions: ['less','scss'],
            filter: function(module, regex, options, log) {
                if (options.development) {
                    // 开发环境模式下有webpack的style-loader介入，所以module.name的值
                    // 是一个经过处理的路径，需要使用插件提供的过滤器进行判断
                    return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
                } else {
                    // 生产环境模式下没有style-loader，module.name就等于了资源文件的路径
                    return regex.test(module.name);
                }
            },
            path: function(module, options, log) {
                // 开发环境模式下有webpack的style-loader介入，所以module.name的值
                // 是一个经过处理的路径，需要使用插件提供的函数进行提取资源文件路径
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
                } else {
                    // 生产环境模式下没有style-loader，module.name就等于了资源文件的路径
                    return module.name;
                }
            },
            parser: function(module, options, log) {
                if (options.development) {
                    // 开发环境模式下有webpack的style-loader介入，需要使用插件提供的解析器进行解析
                    return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
                } else {
                    // 生产环境模式下会有Extract Text Loader来将CSS文本提取出来
                    return module.source;
                }
            }
        }
    }
};
