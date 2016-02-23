/**
 * @file    提供路由组件的定义，主要包括组件和url的映射以及添加对登录状态的检查
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound
} from 'containers';

export default (store) => {

    /**
     * 检查登录状态
     *
     * @param nextState {Object} 下一个状态
     * @param replace {Function} react router提供跳转路由的方法
     * @param cb {Function} 回调函数
     */
    const requireLogin = (nextState, replace, cb) => {

        /**
         * 检查鉴权，当没有登录时跳转到相应页面
         */
        const checkAuth = () => {
            const { auth: { user }} = store.getState();
            if (!user) {
                // 没有登录，跳转到主页
                replace('/');
            }
            cb();
        };

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    // 路由定义时请按照字母顺序排列以方便查找
    return (
        <Route path="/" component={App}>
            { /* 主页路由 */ }
            <IndexRoute component={Home}/>

            { /* 需要登录的路由 */ }
            <Route onEnter={requireLogin}>
                <Route path="chat" component={Chat}/>
                <Route path="loginSuccess" component={LoginSuccess}/>
            </Route>

            { /* 其他路由 */ }
            <Route path="about" component={About}/>
            <Route path="login" component={Login}/>
            <Route path="survey" component={Survey}/>
            <Route path="widgets" component={Widgets}/>

            { /* 都不匹配时的默认路由 */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
