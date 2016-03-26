import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
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
        navItems: state.sidebar.navItems,
        navItemsStatus: state.sidebar.navItemsStatus
    })
)
export default class Portal extends Component {

    static propTypes = {
        navItems: PropTypes.object,                     // 侧边栏导航项集合
        navItemsStatus: PropTypes.object,               // 侧边栏导航项状态集合
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

        return (
            <div id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="gray-bg">
                    <TopNavbar />
                    <div>
                        {children ? React.cloneElement(children, {...props}) : this.getHomeComponent()}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
