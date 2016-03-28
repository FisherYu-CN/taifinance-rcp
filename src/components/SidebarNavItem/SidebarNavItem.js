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

        // 注册导航项, 没有选择在componentWillMount时注册的原因是：服务器端做首屏渲染时，
        // 只会渲染一次而不会更新组件状态，因此即使在componentWillMount时注册导航项并更
        // 新状态，这样的状态变更也不会引起服务器端同步更新组件状态。而当客户端进行渲染时，
        // 由于状态变更会在客户端引起多次组件的状态更新，从而使得客户端渲染得到的HTML与
        // 从服务器端得到的HTML不匹配(checksum值不一致)，在此情况下，客户端会整个重新渲染，
        // 使得服务端首屏渲染就失去了意义。与其如此，不如不在服务端注册组件，把注册组件的工
        // 作放在客户端完成。这样，服务端渲染的基本页面，可以在客户端被使用，并在此基础上做
        // 一些细粒度的状态更新，而componentDidMount方法只在客户端被调用，因此更适合承载
        // 导航项注册这样的工作。
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
                            navItemsStatus: navItemsStatus
                        }, {...props}))}
                    </div>
                </Collapse>
            </li>
        );
    }
}
