const TOGGLE_SIDEBAR = 'taifinance-rcp/sidebar/TOGGLE';
const SELECT_SIDEBAR_MENU_ITEM = 'taifinance-rcp/sidebar/SELECT';

const initialState = {
    minimized: false,
    selectedItem: {},
    folded: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        // 展开/最小化侧边栏
        case TOGGLE_SIDEBAR:
            return {...state, minimized: !state.minimized};

        // 选中一个菜单项
        case SELECT_SIDEBAR_MENU_ITEM: {
            if (state.selectedItem.title === action.item.title
                && state.selectedItem.href === action.item.href
                && action.item.hasChildren) {
                return {
                    ...state,
                    folded: !state.folded
                };
            }

            return {
                selectedItem: action.item,
                folded: false
            };
        }

        default:
            return state;
    }
}

export function toggleSidebar() {
    return {
        type: [TOGGLE_SIDEBAR]
    };
}

export function selectMenuItem(title, href, hasChildren) {
    return {
        type: [SELECT_SIDEBAR_MENU_ITEM],
        item: {title: title, href: href, hasChildren: hasChildren}
    };
}
