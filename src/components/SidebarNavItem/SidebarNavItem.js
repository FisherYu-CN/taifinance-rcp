import React, {Component, PropTypes} from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import {FormattedMessage} from 'react-intl';
import {routeActions} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sidebarActions from 'redux/modules/sidebar';

@connect(
    state => ({
        navItems: state.sidebar.navItems,
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
        parentId: PropTypes.string,                 // 父菜单id
        title: PropTypes.string,                    // 标题
        titleId: PropTypes.string,                  // 标题在国际化文件中的id
        href: PropTypes.string,                     // 指向页面的url
        iconClass: PropTypes.string,                // 图标class名称
        onlyActiveOnIndex: PropTypes.string,        // 是否只在默认路由情况下激活
        children: PropTypes.element,                // 嵌套的子级菜单
        navItems: PropTypes.object,                 // 导航项信息
        navItemsStatus: PropTypes.object,           // 导航项状态
        registerSidebarNavItem: PropTypes.func,     // 注册导航项信息函数
        unregisterSidebarNavItem: PropTypes.func,   // 反注册导航项信息函数
        selectSidebarNavItem: PropTypes.func,       // 选中导航项函数
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

        // 注册导航项
        this.props.registerSidebarNavItem(
            this.props.id,
            this.props.parentId,
            this.props.children ? true : false,
            this.props.title,
            this.props.titleId,
            this.props.href,
            isActive
        );
    }

    componentWillUnmount() {
        // 反注册导航项
        this.props.unregisterSidebarNavItem(this.props.id);
    }

    selectSidebarNavItem(event) {
        event.preventDefault();
        this.props.selectSidebarNavItem(this.props.id);
        if (this.props.href && !this.props.children) {
            this.props.pushState(this.props.href);
        }
    }

    // 组件渲染逻辑
    render() {

        const styles = require('./SidebarNavItem.scss');

        const {id, parentId, title, titleId, href, iconClass, navItems, navItemsStatus, children} = this.props;
        const active = navItemsStatus[id] ? navItemsStatus[id].active : false;
        const expand = navItemsStatus[id] ? navItemsStatus[id].expand : false;

        // 计算导航项层级
        let level = 1;
        if (parentId) {
            let parentNavItem = navItems[parentId];
            while (parentNavItem) {
                level ++;
                if (parentNavItem.parentId) {
                    parentNavItem = navItems[parentNavItem.parentId];
                } else {
                    break;
                }
            }
        }

        // 初始化标题
        let titleComponent;
        if (title) {
            titleComponent = title;
        } else if (titleId) {
            titleComponent = <FormattedMessage id={titleId} />;
        }

        return (
            <li className={styles.sidebarNavItem + (active ? ' active' : '')}>
                <a href={href} onClick={(event) => this.selectSidebarNavItem(event)}>
                    { /* 菜单项图标, 第一层菜单需要渲染图标 */ }
                    {iconClass && level === 1 && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    {level === 1 ? <span className="nav-label">{titleComponent}</span> : titleComponent}

                    { /* 第一二层菜单且存在子级菜单时，需要添加箭头图标 */ }
                    {level < 3 && children && <span className="fa arrow"></span>}
                </a>
                { /* 嵌套的子级菜单 */ }
                <Collapse in={expand}>
                    <div>
                        {children && React.cloneElement(children, {parentId: id, level: level + 1, expand: expand})}
                    </div>
                </Collapse>
            </li>
        );
    }
}
