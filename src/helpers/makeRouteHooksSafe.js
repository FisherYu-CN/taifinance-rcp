import { createRoutes } from 'react-router/lib/RouteUtils';

/**
 * 包装所有路由对象的onEnter hook，使得它们在redux的store尚未被初始化前不能被
 * 执行。这种情况会发生在第一次客户端渲染一个定义了onEnter hook的路由时。
 *
 * @param routes {Array | Object} 路由对象数组或单个理由对象
 * @param store {Object} redux的store对象
 * @return {Array | Object} 原先的路由对象数组或单个理由对象
 */
function makeHooksSafe(routes, store) {
    // 如果对给定路由列表中的所有路由对象调用本方法
    if (Array.isArray(routes)) {
        return routes.map((route) => makeHooksSafe(route, store));
    }

    const onEnter = routes.onEnter;

    // 如果该路由定义了onEnter的hook，包装定义的hook函数，添加了对store的检查
    // 若store尚未被定义好，不执行该hook函数，否则正常执行。
    if (onEnter) {
        routes.onEnter = function safeOnEnter(...args) {
            try {
                store.getState();
            } catch (err) {
                // 如果onEnter hook定义了第三个参数(一个回调方法)，该hook就会异步执行
                // 所有的路由变化都会被阻塞直到这个回调方法执行完毕。但即使是store尚未
                // 被初始化，也不应该影响该回调的执行。
                if (onEnter.length === 3) {
                    args[2]();
                }

                return;
            }

            onEnter.apply(null, args);
        };
    }

    // 为所有子路由递归调用本方法
    if (routes.childRoutes) {
        makeHooksSafe(routes.childRoutes, store);
    }

    // 为index路由递归调用本方法
    if (routes.indexRoute) {
        makeHooksSafe(routes.indexRoute, store);
    }

    return routes;
}

export default function makeRouteHooksSafe(_getRoutes) {
    return (store) => makeHooksSafe(createRoutes(_getRoutes(store)), store);
}
