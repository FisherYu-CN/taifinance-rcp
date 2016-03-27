import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routeActions} from 'react-router-redux';
import * as sidebarActions from 'redux/modules/sidebar';
import {TopNavbar, Sidebar, Footer} from 'components';

// 定义国际化信息
const messages = defineMessages({
    homeModule: {
        id: 'home.module',
        defaultMessage: 'Home',
    }
});

@connect(
    state => ({
        activePathname: state.routing.location.pathname,
        navItems: state.sidebar.navItems,
        navItemsStatus: state.sidebar.navItemsStatus
    }),
    dispatch => bindActionCreators(
        Object.assign({}, sidebarActions, {pushState: routeActions.push}),
        dispatch
    )
)
export default class Portal extends Component {

    static propTypes = {
        activePathname: PropTypes.string,               // 当前URL路径
        navItems: PropTypes.object,                     // 侧边栏导航项集合
        navItemsStatus: PropTypes.object,               // 侧边栏导航项状态集合
        toggleSidebar: PropTypes.func,                  // 切换侧边栏导航项展开/收起状态
        registerSidebarNavItem: PropTypes.func,         // 注册一个侧边栏导航项
        unregisterSidebarNavItem: PropTypes.func,       // 反注册一个侧边栏导航项
        selectSidebarNavItem: PropTypes.func,           // 选择侧边栏导航项
        intl: intlShape,                                // 国际化API
        children: PropTypes.element                     // 子级组件
    };

    /**
     * 获取首页组件
     *
     * @return {Object} 首页组件
     */
    getHomeComponent = () => {

        const {formatMessage} = this.props.intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.homeModule)}/>
            </div>
        );
    }

    render() {

        const {children, ...props} = this.props;

        // FIX: 暂时使用硬编码，之后再获取用户信息代替
        const user = {
            name: 'FisherYu',
            company: 'TaiFinance',
            profileImageUrl: require('./profile.jpg')
        };

        return (
            <div id="wrapper">
                <Sidebar user={user} {...props} />
                <div id="page-wrapper" className="gray-bg">
                    <TopNavbar {...props} />
                    <div>
                        {children ? React.cloneElement(children, {...props}) : this.getHomeComponent()}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
