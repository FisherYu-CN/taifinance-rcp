/**
 * 加载鉴权信息
 *
 * @param {Object} req HTTP请求对象
 * @return {Object} Promise对象，当resolve时，返回session中的用户对象
 */
export function loadAuth(req) {
    return Promise.resolve(req.session.user || null);
}

/**
 * 登录
 *
 * @param {Object} req HTTP请求对象
 * @return {Object} Promise对象，当resolve时，返回用户对象
 */
export function signin(req) {

    return new Promise((resolve, reject) => {

        // 暂时模拟一个用户登录过程, 假定用户名/密码为rcpuser/rcpuser
        // 当用户名/密码正确时返回用户信息，否则返回错误信息
        const username = req.body.name;
        const password = req.body.password;

        if (username === 'rcpuser' && password === 'rcpuser') {
            const user = {
                name: req.body.name,
                password: req.body.password
            };
            req.session.user = user;
            resolve(user);
        } else {
            reject('用户名或密码错误');
        }
    });
}

/**
 * 登出
 *
 * @param {Object} req HTTP请求对象
 * @return {Object} Promise对象，当销毁session成功时resolve并返回null
 */
export function signout(req) {
    return new Promise((resolve) => {
        req.session.destroy(() => {
            req.session = null;
            return resolve(null);
        });
    });
}
