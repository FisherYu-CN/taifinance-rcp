/**
 * @file    整个API服务器的入口，主要完成一些启动服务前的准备工作，比如在node端启用babel转译
 *          以及在开发环境中启用piping进行文件监控等等。
 */

// 开发模式下启用piping监视文件变更
if (process.env.NODE_ENV !== 'production') {
    var piping = require('piping');
    if (!piping({ hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i })) {
        return;
    }
}

// 启用babel转译并启动API server
require('../server.babel');
require('../api/api');
