import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sidebarActions from 'redux/modules/sidebar';

@connect(
    state => ({
        sidebar: state.sidebar
    }),
    dispatch => bindActionCreators(sidebarActions, dispatch)
)
export default class SidebarNavItem extends Component {

    // 组件接受的属性
    static propTypes = {
        title: PropTypes.string.isRequired,         // 标题
        href: PropTypes.string.isRequired,          // 指向页面的url
        iconClass: PropTypes.string,                // 图标class名称
        level: PropTypes.number,                    // 所属菜单层级
        onlyActiveOnIndex: PropTypes.string,        // 是否只在默认路由情况下激活
        children: PropTypes.element                 // 嵌套的子级菜单
    };

    // 组件的上下文环境
    static contextTypes = {
        router: React.PropTypes.object
    };

    // 组件渲染逻辑
    render() {

        const {router} = this.context;
        const {title, href, iconClass, level, onlyActiveOnIndex, children} = this.props;

        // 判断对应的路由是否被激活
        let active;
        if (router) {
            active = router.isActive(href, onlyActiveOnIndex);
        }

        return (
            <li className={active ? 'active' : ''}>
                <a href={href}>
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
