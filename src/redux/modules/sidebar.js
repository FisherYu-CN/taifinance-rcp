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

            if (navItemsStatus[action.id].active) {
                navItemsStatus[action.id].expand = !navItemsStatus[action.id].expand;
            } else {
                // 先重置其他导航项的激活状态
                for (let id in navItemsStatus) {
                    if (navItemsStatus.hasOwnProperty(id)) {
                        navItemsStatus[id].active = false;
                        navItemsStatus[id].expand = false;
                    }
                }

                // 激活当前导航项以及其父导航项状态
                navItemsStatus[action.id].active = true;
                navItemsStatus[action.id].expand = true;

                let parentId = state.navItems[action.id].parentId;
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
export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    };
}

export function registerSidebarNavItem(id, parentId, title, titleId, href, active) {
    return {
        type: REGISTER_SIDEBAR_NAV_ITEM,
        navItem: {
            id: id,
            parentId: parentId,
            title: title,
            titleId: titleId,
            href: href,
            active: active
        }
    };
}

export function unregisterSidebarNavItem(id) {
    return {
        type: UNREGISTER_SIDEBAR_NAV_ITEM,
        id: id
    };
}

export function selectSidebarNavItem(id) {
    return {
        type: SELECT_SIDEBAR_NAV_ITEM,
        id: id
    };
}
