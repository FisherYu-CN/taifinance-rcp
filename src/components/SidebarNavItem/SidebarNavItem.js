import React, {Component, PropTypes} from 'react';
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

    // 组件接受的属性
    static propTypes = {
        id: PropTypes.string.isRequired,            // id
        title: PropTypes.string.isRequired,         // 标题
        href: PropTypes.string,                     // 指向页面的url
        iconClass: PropTypes.string,                // 图标class名称
        level: PropTypes.number,                    // 所属菜单层级
        onlyActiveOnIndex: PropTypes.string,        // 是否只在默认路由情况下激活
        children: PropTypes.element,                // 嵌套的子级菜单
        navItemsStatus: PropTypes.object,           // 导航项状态
        initSidebarNavItemStatus: PropTypes.func,   // 初始化导航项状态函数
        pushState: PropTypes.func                   // 路由跳转函数
    };

    // 组件的上下文环境
    static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillMount() {
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
            console.log('ex');
        }
    }

    // 组件渲染逻辑
    render() {

        const {id, title, href, iconClass, level, navItemsStatus, children} = this.props;
        const active = navItemsStatus[id] ? navItemsStatus[id].active : false;

        return (
            <li className={active ? 'active' : ''}>
                <a href={href} onClick={(event) => this.onClick(event)}>
                    { /* 菜单项图标, 第一层菜单需要渲染图标 */ }
                    {iconClass && level === 1 && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    {level === 1 ? <span className="nav-label">{title}</span> : title}

                    { /* 第二层菜单且存在子级菜单时，需要添加箭头图标 */ }
                    {level === 2 && children && <span className="fa arrow"></span>}
                </a>
                { /* 嵌套的子级菜单 */ }
                {children && React.cloneElement(children, {level: level + 1})}
            </li>
        );
    }
}
