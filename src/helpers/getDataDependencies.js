/**
 * 异步获取依赖的数据，实际通过调用组件定义的fetchData或fetchDataDeferred方法并返回promise
 *
 * @param components {Array} 组件数组
 * @param getState {Function} 获取redux全局状态的函数
 * @param dispatch {Function} redux的action分发函数
 * @param location {Object} 位置对象
 * @param params {Object} url中查询字符串参数
 * @param deferred {boolean} 是否延迟获取依赖
 * @return {Array} 调用fetchData或fetchDataDeferred方法获得的promise数组
 */
export default (components, getState, dispatch, location, params, deferred) => {
    // 根据参数选择调用component的哪个方法
    const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

    // 1. 过滤出实现了fetchData或fetchDataDeferred方法的组件
    // 2. 取出这些组件的fetchData或fetchDataDeferred方法
    // 3. 调用这些组件的fetchData或fetchDataDeferred方法，并返回promise数组
    return components
        .filter((component) => component && component[methodName])
        .map((component) => component[methodName])
        .map(fetchData => fetchData(getState, dispatch, location, params));
};
