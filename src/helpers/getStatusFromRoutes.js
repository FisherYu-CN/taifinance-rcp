/**
 * 查询最后一个有状态码属性的路由并返回状态码
 *
 * @param matchedRoutes {Array} 路由状态数组
 * @return {?number} 状态码或者null
 */
export default (matchedRoutes) => {
    return matchedRoutes.reduce((prev, cur) => cur.status || prev, null);
};
