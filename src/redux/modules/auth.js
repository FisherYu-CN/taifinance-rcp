// Action类型常量
const LOAD = 'taifinance-rcp/auth/LOAD';
const LOAD_SUCCESS = 'taifinance-rcp/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'taifinance-rcp/auth/LOAD_FAIL';
const SIGNIN = 'taifinance-rcp/auth/SIGNIN';
const SIGNIN_SUCCESS = 'taifinance-rcp/auth/SIGNIN_SUCCESS';
const SIGNIN_FAIL = 'taifinance-rcp/auth/SIGNIN_FAIL';
const SIGNOUT = 'taifinance-rcp/auth/SIGNOUT';
const SIGNOUT_SUCCESS = 'taifinance-rcp/auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'taifinance-rcp/auth/SIGNOUT_FAIL';

// 初始状态
const initialState = {
    loaded: false
};

// 处理Action的Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        // 加载用户信息
        case LOAD: {
            return {
                ...state,
                loading: true
            };
        }

        // 加载用户信息成功
        case LOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result
            };
        }

        // 加载用户信息失败
        case LOAD_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        }

        // 登录
        case SIGNIN: {
            return {
                ...state,
                signingIn: true
            };
        }

        // 登录成功
        case SIGNIN_SUCCESS:
        {
            return {
                ...state,
                signingIn: false,
                user: action.result
            };
        }

        // 登录失败
        case SIGNIN_FAIL: {
            return {
                ...state,
                signingIn: false,
                user: null,
                loginError: action.error
            };
        }

        // 登出
        case SIGNOUT: {
            return {
                ...state,
                signingOut: true
            };
        }

        // 登出成功
        case SIGNOUT_SUCCESS: {
            return {
                ...state,
                signingOut: false,
                user: null
            };
        }

        // 登出失败
        case SIGNOUT_FAIL: {
            return {
                ...state,
                signingOut: false,
                signoutError: action.error
            };
        }

        default:
            return state;
    }
}

/**
 * 判断用户信息是否已加载
 * @param {Object} globalState 全局状态对象
 * @return {boolean} 用户信息是否已加载
 */
export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

// Action生成函数
/**
 * 加载用户信息
 *
 * @return {Object} 加载用户信息的Action
 */
export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/loadAuth')
    };
}

/**
 * 登录
 *
 * @param {string} 用户名
 * @param {string} 密码
 * @return {Object} 登录Action
 */
export function signin(name, password) {
    return {
        types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL],
        promise: (client) => client.post('/signin', {
            data: {
                name: name,
                password: password
            }
        })
    };
}

/**
 * 注销
 *
 * @return {Object} 注销Action
 */
export function signout() {
    return {
        types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAIL],
        promise: (client) => client.get('/signout')
    };
}
