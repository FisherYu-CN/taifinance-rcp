/**
 * @file    连接组件与获取依赖数据方法fetchData和fetchDataDeffered的decorator，返回一个经
 *          过包装的组件，该组件中包含了2fetchData和fetchDataDeffered方法，这2个方法会在路
 *          由转换时，由transitionMiddleware进行调用。当此decorator使用时必须作为第一个也
 *          就是最外层的decorator，否则2个fetch方法无法被正确调用。
 */

import React, { Component } from 'react';

export default function connectData(fetchData, fetchDataDeferred) {
    return function wrapWithFetchData(WrappedComponent) {

        // 包装给定的组件，注入2个fetch方法并返回
        class ConnectData extends Component {

            static fetchData = fetchData;
            static fetchDataDeferred = fetchDataDeferred;

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }

        return ConnectData;
    };
}
