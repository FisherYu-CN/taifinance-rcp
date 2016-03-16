/**
 * @file    这是客户端的入口文件，相对的是服务端的入口文件server.js。
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import io from 'socket.io-client';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

// 创建redux store对象，并使用标准的scroll策略以记录滚动条的位置
const client = new ApiClient();
const history = useScroll(() => browserHistory)();
const store = createStore(history, client, window.__data);
const i18n = window.__i18n;

// 添加两种语言支持
addLocaleData(en);
addLocaleData(zh);

/**
 * 初始化socket对象
 */
function initSocket() {
    const socket = io('', {path: '/ws'});

    // 监听news事件，输出数据到控制台并发送另一个事件
    socket.on('news', (data) => {
        console.log(data);
        socket.emit('my other event', {my: 'data from client'});
    });

    // 监听msg事件并输出数据到控制台
    socket.on('msg', (data) => {
        console.log(data);
    });

    return socket;
}

// 初始化全局socket对象
global.socket = initSocket();

// 创建路由组件
const component = (
    <Router
        render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />}
        history={history}>
            {getRoutes(store)}
    </Router>
);

// 渲染页面
const dest = document.getElementById('content');
ReactDOM.render(
    <Provider store={store} key="provider">
        <IntlProvider locale={i18n.locale} messages={i18n.messages}>
            {component}
        </IntlProvider>
    </Provider>,
    dest
);

// 在非生产环境中启用相关的调试工具
if (process.env.NODE_ENV !== 'production') {
    window.React = React;

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}

// 当启用开发工具时，添加开发工具组件并重新渲染页面
if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');
    ReactDOM.render(
        <Provider store={store} key="provider">
            <IntlProvider locale={i18n.locale} messages={i18n.messages}>
                <div>
                    {component}
                    <DevTools />
                </div>
            </IntlProvider>
        </Provider>,
        dest
    );
}
