const TOGGLE_SIDEBAR = 'taifinance-rcp/sidebar/TOGGLE';
const INIT_SIDEBAR_NAV_ITEM_STATUS = 'taifinance-rcp/sidebar/INIT_NAV_ITEM_STATUS';
const TOGGLE_SIDEBAR_NAV_ITEM = 'taifinance-rcp/sidebar/TOGGLE_NAV_ITEM';

const initialState = {
    minimized: false,
    navItemsStatus: {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        // 展开/最小化侧边栏
        case TOGGLE_SIDEBAR:
            return {...state, minimized: !state.minimized};

        // 初始化导航项状态
        case INIT_SIDEBAR_NAV_ITEM_STATUS: {

            const navItemsStatus = Object.assign({}, state.navItemsStatus);
            navItemsStatus[action.status.id] = {active: action.status.active, expand: false};

            return {
                ...state,
                navItemsStatus: navItemsStatus
            };
        }

        // 选中一个导航项
        case TOGGLE_SIDEBAR_NAV_ITEM: {
            return state;
        }

        default:
            return state;
    }
}

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    };
}

export function initSidebarNavItemStatus(id, active) {
    return {
        type: INIT_SIDEBAR_NAV_ITEM_STATUS,
        status: {id: id, active: active}
    };
}

export function toggleSidebarNavItem(id) {
    return {
        type: TOGGLE_SIDEBAR_NAV_ITEM,
        item: {id: id}
    };
}
