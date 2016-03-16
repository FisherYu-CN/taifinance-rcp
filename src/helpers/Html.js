/**
 * @file    Html是一个包装组件，其中包含了HTML元数据以及模板标签，用在服务端代码中来包装
 *          渲染路由组件得到的字符串输出。该组件没有(也不能)包含HTML文档类型的声明，需要
 *          在server.js中额外添加到渲染后的输出结果之中。
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import BodyClassName from 'react-body-classname';

export default class Html extends Component {

    // 定义可接受的property的类型
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object,
        i18n: PropTypes.object
    };

    render() {
        const {assets, component, store, i18n} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();
        const bodyClassName = BodyClassName.rewind();

        return (
            <html lang="en-us">
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}

                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* CSS样式文件，仅在生产环境中存在，由webpack的extract text插件生成 */}
                {Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen, projection"
                          rel="stylesheet" type="text/css" charSet="UTF-8"/>
                )}

                {/* CSS内联样式，仅在开发环境中存在，输出一个包含所有bootstrap以及其他定制样式的<style>标签 */}
                {/* 使用内联样式可以使开发模式下页面加载时更加流畅，理想情况下，这里也可以包含当前页面的样式 */}
                {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js')}}/> : null}
            </head>
            <body className={bodyClassName}>
                <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
                <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
                <script dangerouslySetInnerHTML={{__html: `window.__i18n=${serialize(i18n)};`}} />
                <script src={assets.javascript.main} charSet="UTF-8"/>
            </body>
            </html>
        );
    }
}
