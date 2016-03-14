/**
 * @file    提供路由组件的定义，主要包括组件和url的映射以及添加对登录状态的检查
 */

import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {App, Landing, Signin, Signup, Portal, Home, DataModel, NotFound} from 'containers';

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
            /**
            const { auth: { user }} = store.getState();
            if (!user) {
                // 没有登录，跳转到主页
                replace('/signin');
            }*/
            cb();
        };

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    return (
        <Route path="/" component={App}>
            { /* 主页路由 */ }
            <IndexRoute component={Landing}/>

            { /* 需要登录的路由 */ }
            <Route onEnter={requireLogin}>
                <Route path="portal" component={Portal}>

                    { /* 首页 */ }
                    <Route path="home" component={Home} />

                    { /* 模型管理 */ }
                    <Route path="datamodels" component={DataModel} />
                    <Route path="datamodels/new" component={DataModel} />
                    <Route path="datamodels/:id" component={DataModel} />
                    <Route path="datamodels/:id/edit" component={DataModel} />


                </Route>
            </Route>

            { /* 其他路由 */ }
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>

            { /* 都不匹配时的默认路由 */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
