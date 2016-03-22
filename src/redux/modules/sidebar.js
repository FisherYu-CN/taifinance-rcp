// Action类型常量
const TOGGLE_SIDEBAR = 'taifinance-rcp/sidebar/TOGGLE';
const REGISTER_SIDEBAR_NAV_ITEM = 'taifinance-rcp/sidebar/REGISTER_SIDEBAR_NAV_ITEM';
const UNREGISTER_SIDEBAR_NAV_ITEM = 'taifinance-rcp/sidebar/UNREGISTER_SIDEBAR_NAV_ITEM';
const SELECT_SIDEBAR_NAV_ITEM = 'taifinance-rcp/sidebar/SELECT_SIDEBAR_NAV_ITEM';

// 初始状态
const initialState = {
    minimized: false,
    navItems: {},
    navItemsStatus: {}
};

// 处理Action的Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        // 展开/最小化侧边栏
        case TOGGLE_SIDEBAR:
            return {...state, minimized: !state.minimized};

        // 注册导航项
        case REGISTER_SIDEBAR_NAV_ITEM: {

            // 导航项信息，包含相对固定的数据
            let navItems = Object.assign({}, state.navItems);
            navItems[action.navItem.id] = {
                parentId: action.navItem.parentId,
                hasChildren: action.navItem.hasChildren,
                title: action.navItem.title,
                titleId: action.navItem.titleId,
                href: action.navItem.href
            };

            // 导航项状态，包含容易变化的数据
            let navItemsStatus = Object.assign({}, state.navItemsStatus);
            navItemsStatus[action.navItem.id] = {
                active: action.navItem.active,
                expand: false
            };

            // 确保所有被激活的菜单的父菜单都被激活且展开
            for (let id in navItems) {
                if (navItems.hasOwnProperty(id)) {
                    if (navItemsStatus[id].active && navItems[id].parentId) {
                        let parentNavItem = navItems[navItems[id].parentId];
                        let parentNavItemStatus = navItemsStatus[navItems[id].parentId];
                        while (parentNavItem && parentNavItemStatus) {
                            parentNavItemStatus.active = true;
                            parentNavItemStatus.expand = true;
                            if (parentNavItem.parentId) {
                                // 此处要最后给parentNavItem赋值以保证之前的引用正确
                                parentNavItemStatus = navItemsStatus[parentNavItem.parentId];
                                parentNavItem = navItems[parentNavItem.parentId];
                            } else {
                                break;
                            }
                        }
                    }
                }
            }

            return {
                ...state,
                navItems: navItems,
                navItemsStatus: navItemsStatus
            };
        }

        // 反注册导航项
        case UNREGISTER_SIDEBAR_NAV_ITEM: {

            // 删除导航项信息
            let navItems = Object.assign({}, state.navItems);
            delete navItems[action.id];

            // 删除导航项状态
            let navItemsStatus = Object.assign({}, state.navItemsStatus);
            delete navItemsStatus[action.id];

            return {
                ...state,
                navItems: navItems,
                navItemsStatus: navItemsStatus
            };
        }

        // 选中一个导航项
        case SELECT_SIDEBAR_NAV_ITEM: {

            const navItemsStatus = Object.assign({}, state.navItemsStatus);

            // 用户提供导航项id时直接用该id，否则根据提供的href来查找对应的导航项id，存在找不到对应导航项的情况
            let selectedNavItemId;
            if (action.id) {
                selectedNavItemId = action.id;
            } else {
                // 根据href查找导航项id
                for (let id in state.navItems) {
                    if (state.navItems.hasOwnProperty(id) && state.navItems[id].href === action.href) {
                        selectedNavItemId = id;
                        break;
                    }
                }
            }

            if (selectedNavItemId && state.navItems[selectedNavItemId].hasChildren && navItemsStatus[selectedNavItemId].active) {
                // 选择了一个已激活的导航项组，收起并取消该导航项组的激活状态
                navItemsStatus[selectedNavItemId].expand = !navItemsStatus[selectedNavItemId].expand;
                navItemsStatus[selectedNavItemId].active = !navItemsStatus[selectedNavItemId].active;
            } else if (!selectedNavItemId) {
                // 查找不到相应的导航项，说明没有导航项与之匹配，重置所有导航项状态为未激活
                for (let id in navItemsStatus) {
                    if (navItemsStatus.hasOwnProperty(id)) {
                        navItemsStatus[id].active = false;
                        navItemsStatus[id].expand = false;
                    }
                }
            } else {
                // 重置导航项的激活状态的条件：
                // 1. 选中的导航项没有子孙时(路由变更)，重置所有其他导航项激活状态
                // 2. 选中的导航项有子孙时，重置所有其他非叶兄弟导航项激活状态
                for (let id in navItemsStatus) {
                    if (navItemsStatus.hasOwnProperty(id)) {
                        if (!state.navItems[selectedNavItemId].hasChildren || (state.navItems[id].hasChildren &&
                            state.navItems[id].parentId === state.navItems[selectedNavItemId].parentId)) {
                            navItemsStatus[id].active = false;
                            navItemsStatus[id].expand = false;
                        }
                    }
                }

                // 激活当前导航项以及其父导航项状态
                navItemsStatus[selectedNavItemId].active = true;
                navItemsStatus[selectedNavItemId].expand = true;

                let parentId = state.navItems[selectedNavItemId].parentId;
                if (parentId) {
                    let parentNavItem = state.navItems[parentId];
                    let parentNavItemStatus = navItemsStatus[parentId];
                    while (parentNavItem && parentNavItemStatus) {
                        parentNavItemStatus.active = true;
                        parentNavItemStatus.expand = true;
                        if (parentNavItem.parentId) {
                            // 此处要最后给parentNavItem赋值以保证之前的引用正确
                            parentNavItemStatus = navItemsStatus[parentNavItem.parentId];
                            parentNavItem = state.navItems[parentNavItem.parentId];
                        } else {
                            break;
                        }
                    }
                }
            }

            return {
                ...state,
                navItemsStatus: navItemsStatus
            };
        }

        default:
            return state;
    }
}

// Action生成函数
/**
 * 切换侧边栏展开/收起状态
 *
 * @return {Object} 切换侧边栏状态Action
 */
export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    };
}

/**
 * 注册一个侧边栏导航项
 *
 * @param id {string} 导航项id
 * @param parentId {?string} 父导航项id
 * @param hasChildren {boolean} 是否包含子导航项
 * @param title {?string} 导航项标题
 * @param titleId {?string} 导航项标题的国际化标签id
 * @param href {?string} 导航项链接url
 * @param active {boolean} 导航项是否激活
 * @return {Object} 注册侧边栏导航项Action
 */
export function registerSidebarNavItem(id, parentId, hasChildren, title, titleId, href, active) {
    return {
        type: REGISTER_SIDEBAR_NAV_ITEM,
        navItem: {
            id: id,
            parentId: parentId,
            hasChildren: hasChildren,
            title: title,
            titleId: titleId,
            href: href,
            active: active
        }
    };
}

/**
 * 反注册一个侧边栏导航项
 *
 * @param id {string} 导航项id
 * @return {Object} 反注册侧边栏导航项Action
 */
export function unregisterSidebarNavItem(id) {
    return {
        type: UNREGISTER_SIDEBAR_NAV_ITEM,
        id: id
    };
}

/**
 * 选择(点击)一个侧边栏导航项
 *
 * @param id {?string} 导航项id
 * @param id {href=} 导航项链接url
 * @return {Object} 选择(点击)侧边栏导航项Action
 */
export function selectSidebarNavItem(id, href) {
    return {
        type: SELECT_SIDEBAR_NAV_ITEM,
        id: id,
        href: href
    };
}
