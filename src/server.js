/**
 * @file    这是服务端的入口文件，相对的是客户端的入口文件client.js。
 */

import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import createHistory from 'react-router/lib/createMemoryHistory';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import PrettyError from 'pretty-error';
import path from 'path';
import http from 'http';
import config from './config';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getRoutes from './routes';

// 创建代理到API server的代理服务，并支持websocket请求
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true
});

// 创建express应用
const app = new Express();

// 使用compression中间件来压缩响应body数据
app.use(compression());

// 使用favicon中间件来处理所有对favicon的请求
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

// 使用express的static中间件来处理对所有静态资源的请求
app.use(Express.static(path.join(__dirname, '..', 'static')));

// 代理所有api和websocket请求到API server
app.use('/api', (req, res) => {
    proxy.web(req, res, { target: targetUrl });
});

app.use('/ws', (req, res) => {
    proxy.web(req, res, { target: targetUrl + '/ws' });
});

// 创建HTTP服务器
const server = new http.Server(app);
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

// 添加错误处理来避免http-proxy的issue，具体查看https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
    let json;
    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }
    if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
    }

    json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
});

const pretty = new PrettyError();

app.use((req, res) => {

    // 清除webpack缓存数据，因为开发环境中启用了热重载，脚本文件会被替换
    if (__DEVELOPMENT__) {
        webpackIsomorphicTools.refresh();
    }

    // 创建redux store
    const client = new ApiClient(req);
    const history = createHistory(req.originalUrl);
    const store = createStore(history, client);

    /**
     * 返回最基本的HTML页面框架，将具体组件的渲染工作抛给客户端处理
     */
    function hydrateOnClient() {
        res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
    }

    // 如果禁用了服务端渲染，则转向客户端渲染
    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        // 重定向路由，进行跳转
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        }
        // 路由错误，转向客户端渲染
        else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient();
        }
        // 一般路由，进行服务端渲染
        else if (renderProps) {

            loadOnServer({...renderProps, store, helpers: {client}}).then(() => {

                // 初始化组件
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect {...renderProps} />
                    </Provider>
                );

                // 状态码设为200成功
                res.status(200);

                // 设定用户使用的浏览器
                global.navigator = { userAgent: req.headers['user-agent'] };

                // 渲染页面并返回结果
                res.send('<!doctype html>\n' +
                    ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
            });
        }
        // 给定的location没有匹配到对应的路由，返回404错误
        else {
            res.status(404).send('Not found');
        }
    });
});

// 启动http服务器，监听相应端口
if (config.port) {
    server.listen(config.port, (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
}
