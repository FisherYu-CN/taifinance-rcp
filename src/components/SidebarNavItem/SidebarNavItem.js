import React, {Component, PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {routeActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sidebarActions from 'redux/modules/sidebar';

@connect(
    state => ({
        navItemsStatus: state.sidebar.navItemsStatus
    }),
    dispatch => bindActionCreators(
        Object.assign({}, sidebarActions, {pushState: routeActions.push}),
        dispatch
    )
)
export default class SidebarNavItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,            // id
        title: PropTypes.string,                    // 标题
        titleId: PropTypes.string,                  // 标题在国际化文件中的id
        href: PropTypes.string,                     // 指向页面的url
        iconClass: PropTypes.string,                // 图标class名称
        level: PropTypes.number,                    // 所属菜单层级
        onlyActiveOnIndex: PropTypes.string,        // 是否只在默认路由情况下激活
        children: PropTypes.element,                // 嵌套的子级菜单
        navItemsStatus: PropTypes.object,           // 导航项状态
        initSidebarNavItemStatus: PropTypes.func,   // 初始化导航项状态函数
        toggleSidebarNavItemGroup: PropTypes.func,
        pushState: PropTypes.func                   // 路由跳转函数
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentDidMount() {
        let isActive;
        if (this.props.href) {
            isActive = this.context.router.isActive(this.props.href, this.props.onlyActiveOnIndex);
        } else {
            isActive = false;
        }
        this.props.initSidebarNavItemStatus(this.props.id, isActive);
    }

    onClick(event) {
        event.preventDefault();
        if (this.props.href && !this.props.children) {
            this.props.pushState(this.props.href);
        } else {
            this.props.toggleSidebarNavItemGroup(this.props.id);
        }
    }

    // 组件渲染逻辑
    render() {

        const {id, title, titleId, href, iconClass, level, navItemsStatus, children} = this.props;
        const active = navItemsStatus[id] ? navItemsStatus[id].active : false;
        const expand = navItemsStatus[id] ? navItemsStatus[id].expand : false;

        // 初始化标题
        let titleComponent;
        if (title) {
            titleComponent = title;
        } else if (titleId) {
            titleComponent = <FormattedMessage id={titleId} />;
        }

        return (
            <li className={active ? 'active' : ''}>
                <a href={href} onClick={(event) => this.onClick(event)}>
                    { /* 菜单项图标, 第一层菜单需要渲染图标 */ }
                    {iconClass && level === 1 && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    {level === 1 ? <span className="nav-label">{titleComponent}</span> : titleComponent}

                    { /* 第一二层菜单且存在子级菜单时，需要添加箭头图标 */ }
                    {level < 3 && children && <span className="fa arrow"></span>}
                </a>
                { /* 嵌套的子级菜单 */ }
                {children && React.cloneElement(children, {level: level + 1, expand: expand})}
            </li>
        );
    }
}
