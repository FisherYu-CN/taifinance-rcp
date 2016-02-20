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

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient {

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

export default ApiClient;
