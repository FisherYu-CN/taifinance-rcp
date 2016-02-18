/**
 * @file    定义了transition中间件
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

            const doTransition = () => {
                next(action);
                Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
                    .then(resolve)
                    .catch(error => {
                        // TODO: You may want to handle errors for fetchDataDeferred here
                        console.warn('Warning: Error in fetchDataDeferred', error);
                        return resolve();
                    });
            };

            Promise.all(getDataDependencies(components, getState, dispatch, location, params))
                .then(doTransition)
                .catch(error => {
                    // TODO: You may want to handle errors for fetchData here
                    console.warn('Warning: Error in fetchData', error);
                    return doTransition();
                });
        });

        if (__SERVER__) {
            // router state is null until ReduxRouter is created so we can use this to store
            // our promise to let the server know when it can render
            getState().router = promise;
        }

        return promise;
    }

    return next(action);
};
