/**
 * @file    transition中间件主要负责在路由转换过程中，插入对组件依赖数据的预加载。组件依赖的数据由组件中
 *          fetchData和fetchDataDeferred方法来获取。前者中定义需要立即获取的数据，后者中定义可以延迟获
 *          取的数据。
 */

import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';
import getDataDependencies from '../../helpers/getDataDependencies';

/**
 * 判断location是否相同
 *
 * @param locA {Object} 一个location
 * @param locB {Object} 另一个location
 */
const locationsAreEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search);

export default ({ getState, dispatch }) => next => action => {

    if (action.type === ROUTER_DID_CHANGE) {

        // 新跳转的url与当前的相同，不做处理
        if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
            return next(action);
        }

        const { components, location, params } = action.payload;

        const promise = new Promise((resolve) => {

            // 执行路由改变，继续传递路由变迁action的同时，加载那些可以延迟加载的数据
            const doTransition = () => {
                next(action);
                Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
                    .then(resolve)
                    .catch(error => {
                        // TODO: 此处添加对获取延迟加载数据发生错误时的处理
                        console.warn('Warning: Error in fetchDataDeferred', error);
                        return resolve();
                    });
            };

            // 在路由即将改变之前，首先调用所有组件的fetchData方法来获取渲染需要的数据，在此之前路由改变
            // 的action不会被继续派发直到数据都已经准备好。当这些数据都已经准备完毕后，派发action，同时
            // 再调用所有组件的fetchDataDeferred方法来获取那些可以延迟加载的数据。
            Promise.all(getDataDependencies(components, getState, dispatch, location, params, false))
                .then(doTransition)
                .catch(error => {
                    // TODO: 此处添加对获取预先加载数据发生错误时的处理
                    console.warn('Warning: Error in fetchData', error);
                    return doTransition();
                });
        });

        // 在服务器端渲染时，需要预先将所有依赖数据都准备好，无论是立即加载还是延迟加载的数据。这里由于redux
        // router对象还未创建，可以借用router状态来返回一个promise。当这个promise被resolve后，也就是所有
        // 依赖数据都准备好时，服务端才能够渲染整个页面并返回，具体查看src/server.js中服务器渲染的相关代码。
        // 由于首屏在服务器端渲染，轮到客户端渲染时，redux router已经创建，router状态应该由redux router进
        // 行管理，不能直接修改。
        if (__SERVER__) {
            getState().router = promise;
        }

        // 最后返回promise对象，等到那些需要立即加载的数据准备完毕后即可重新向下派发路由变迁action，更新路由
        // 状态，最后进行页面渲染
        return promise;
    }

    return next(action);
};
