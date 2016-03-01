import React, {Component, PropTypes} from 'react';
import NavItem from 'react-bootstrap/lib/NavItem';
import {LinkContainer} from 'react-router-bootstrap';

export default class SidebarNavItem extends Component {

    // 组件接受的属性
    static propTypes = {
        title: PropTypes.string.isRequired,     // 标题
        href: PropTypes.string.isRequired,      // 指向页面的url
        iconClass: PropTypes.string,            // 图标class名称
        level: PropTypes.number,                // 所属菜单层级
        children: PropTypes.object              // 嵌套的子级菜单
    };

    // 组件渲染逻辑
    render() {

        const {title, href, iconClass, level, children} = this.props;

        // 如果存在子级菜单，为子级菜单的层级+1
        const childrenWithLevel = children && React.cloneElement(React.Children.only(children), { level: level + 1 });

        return (
            <LinkContainer to={href}>
                <NavItem>
                    { /* 菜单项图标, 当level为undefined时，表示属于第一层菜单，需要渲染图标 */ }
                    {iconClass && !level && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    {level === 1 ? <span className="nav-label"></span> : {title}}

                    { /* 第二层菜单且存在子级菜单时，需要添加箭头图标 */ }
                    {level === 2 && children && <span className="fa arrow"></span>}

                    { /* 嵌套的子级菜单 */ }
                    {childrenWithLevel}
                </NavItem>
            </LinkContainer>
        );
    }
}
