import React, {Component, PropTypes} from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';

export default class SidebarNavItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,            // id
        parentId: PropTypes.string,                 // 父菜单id
        title: PropTypes.string.isRequired,         // 标题
        href: PropTypes.string.isRequired,          // 指向页面的url
        iconClass: PropTypes.string,                // 图标class名称
        onlyActiveOnIndex: PropTypes.bool,          // 是否只在默认路由情况下激活
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

        const {router} = this.context;
        const {id, parentId, title, href, onlyActiveOnIndex, children, registerSidebarNavItem} = this.props;

        let isActive;
        if (href) {
            isActive = router.isActive({pathname: href}, onlyActiveOnIndex);
        } else {
            isActive = false;
        }

        // 注册导航项
        registerSidebarNavItem(
            id,
            parentId,
            children ? true : false,
            title,
            href,
            isActive
        );
    }

    componentWillUnmount() {

        const {id, unregisterSidebarNavItem} = this.props;

        // 反注册导航项
        unregisterSidebarNavItem(id);
    }

    /**
     * 选取一个导航项事件处理函数
     *
     * @param event {Object} 选取导航项事件
     */
    selectSidebarNavItem = (event) => {

        const {id, href, children, selectSidebarNavItem, pushState} = this.props;

        event.preventDefault();
        if (children) {
            // 点击导航项组，改变展开和激活状态
            selectSidebarNavItem(id);
        } else {
            // 点击导航项, 路由变更
            pushState(href);
        }
    }

    // 组件渲染逻辑
    render() {

        const styles = require('./SidebarNavItem.scss');

        const {id, parentId, title, href, iconClass, navItems, navItemsStatus, children, ...props} = this.props;
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

        return (
            <li className={styles.sidebarNavItem + (active ? ' active' : '')}>
                <a href={href} onClick={(event) => this.selectSidebarNavItem(event)}>
                    { /* 菜单项图标, 第一层菜单需要渲染图标 */ }
                    {iconClass && level === 1 && <i className={'fa ' + iconClass}></i>}

                    { /* 菜单项标题 */ }
                    {level === 1 ? <span className="nav-label">{title}</span> : title}

                    { /* 第一二层菜单且存在子级菜单时，需要添加箭头图标 */ }
                    {level < 3 && children && <span className="fa arrow"></span>}
                </a>
                { /* 嵌套的子级菜单 */ }
                <Collapse in={expand}>
                    <div>
                        {children && React.cloneElement(children, Object.assign({}, {
                            parentId: id,
                            level: level + 1,
                            expand: expand,
                            navItems: navItems,
                            navItemsStatus: navItems
                        }, {...props}))}
                    </div>
                </Collapse>
            </li>
        );
    }
}
