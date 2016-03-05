import React, {Component, PropTypes} from 'react';

export default class SidebarNavItem extends Component {

    // 组件接受的属性
    static propTypes = {
        title: PropTypes.string.isRequired,     // 标题
        href: PropTypes.string.isRequired,      // 指向页面的url
        iconClass: PropTypes.string,            // 图标class名称
        level: PropTypes.number,                // 所属菜单层级
        children: PropTypes.element             // 嵌套的子级菜单
    };

    // 组件渲染逻辑
    render() {

        const {title, href, iconClass, level, children} = this.props;

        return (
            <li>
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
