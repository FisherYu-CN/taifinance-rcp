import React, { Component, PropTypes } from 'react';

export default class SidebarNavItem extends Component {

    // 组件接受的属性
    static propTypes = {
        title: PropTypes.string.isRequired,     // 标题
        href: PropTypes.string.isRequired,      // 指向页面的url
        iconClass: PropTypes.string,            // 图标class名称
        active: PropTypes.bool,                 // 是否激活
        children: PropTypes.object              // 子菜单
    };

    // 组件渲染逻辑
    render() {

        const {title, href, iconClass, active, children} = this.props;

        return (
            <li className={active ? 'active' : ''}>
                <a href={href}>
                    { /* 菜单项图标 */ }
                    {iconClass && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    <span className="nav-label">{title}</span>

                    { /* 可能嵌套有子级菜单 */ }
                    {children}
                </a>
            </li>
        );
    }
}


