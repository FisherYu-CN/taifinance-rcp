/**
 * @file    ApiClient为客户端和服务端提供统一的与API server通信的facade。在服务端，ApiClient
 *          接受一个请求对象，从而可以将会话cookie传递到API server来保持会话状态。ApiClient会
 *          被传递给redux中间件，所以在action creator中可以访问到ApiClient的实例，具体方式是
 *          为生成的action定义一个promise属性，该属性接受一个以ApiClient实例作为唯一参数的函数。
 */

import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * 格式化请求url
 *
 * @param path {string} 请求路径
 * @return {string} 格式化后的请求路径
 */
const formatUrl = (path) => {
    // 路径不以'/'开头时手动添加'/'
    const adjustedPath = path[0] !== '/' ? '/' + path : path;

    // 服务器端渲染时，补全主机名与端口号
    if (__SERVER__) {
        return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
    }
    // 客户端端渲染时，在路径前添加/api以代理请求到API server
    return '/api' + adjustedPath;
};

export default class ApiClient {

    constructor(req) {

        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) =>
                new Promise((resolve, reject) => {

                    // 使用superagent代理请求API server
                    const request = superagent[method](formatUrl(path));

                    // 设置请求参数
                    if (params) {
                        request.query(params);
                    }

                    // 服务器端请求时，需要携带cookie
                    if (__SERVER__ && req.get('cookie')) {
                        request.set('cookie', req.get('cookie'));
                    }

                    // 设置请求体数据
                    if (data) {
                        request.send(data);
                    }

                    // 设置请求处理的回调
                    request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
                }));
    }
}
