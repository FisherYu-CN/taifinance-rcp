/**
 * @file    定义了client中间件，该中间件主要提供了两大功能： 第一，允许action creator返回一个thunk。
 *          第二，允许action携带一个promise生成器(一个接受ApiClient对象并返回一个promise的函数)以及
 *          三个action类型，分别标示数据正在加载，数据加载成功和数据加载失败。在promise完成后使用这些
 *          action类型根据实际结果dispatch相应的action。
 */

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => {
        return next => action => {
            // 当接收到的action是一个函数(thunk)，调用该函数生成具体的action并返回
            // 类似于react-thunk，允许action creator访问dispatch和getState函数
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare

            // 非异步action，传递给下一个中间件
            if (!promise) {
                return next(action);
            }

            // 获取定义的请求/请求成功/请求失败三种Action类型
            const [REQUEST, SUCCESS, FAILURE] = types;
            next({ ...rest, type: REQUEST });
            return promise(client)  // 为promise生成器提供ApiClient对象
                .then(
                    (result) => next({ ...rest, result, type: SUCCESS }),
                    (error) => next({ ...rest, error, type: FAILURE })
                )
                .catch((error)=> {
                    console.error('MIDDLEWARE ERROR:', error);
                    next({ ...rest, error, type: FAILURE });
                });
        };
    };
}
