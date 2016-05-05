import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import {intlShape, injectIntl} from 'react-intl';
import Helmet from 'react-helmet';
import config from '../../config';

@injectIntl
@connect(
    state => ({user: state.auth.user}),
    {pushState: routeActions.push}
)
export default class App extends Component {

    static propTypes = {
        user: PropTypes.object,                           // 用户信息
        pushState: PropTypes.func.isRequired,           // 路由跳转Action Creator
        intl: intlShape.isRequired,                     // 国际化API
        children: PropTypes.element.isRequired          // 子级组件
    };

    componentWillReceiveProps(nextProps) {

        const {user, pushState} = this.props;

        // 当获取了用户状态时，代表登录成功，路由需跳转到首页
        // 当用户状态信息被清除时，代表登出成功，路由需要跳转到登录页面
        if (!user && nextProps.user) {
            pushState('/portal');
        } else if (user && !nextProps.user) {
            pushState('/signin');
        }
    }

    render() {

        const {intl, children} = this.props;

        return (
            <div>
                <Helmet {...config.app.head}/>
                <div>{React.cloneElement(children, {intl: intl})}</div>
            </div>
        );
    }
}
