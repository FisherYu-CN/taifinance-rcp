import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class Users extends Component {

    static propTypes = {
        children: PropTypes.element                // 嵌套的子级菜单
    };

    /**
     * 获取用户列表组件
     *
     * @return {Object} 用户列表组件
     */
    getUserListComponent = () => {
        return (
            <div>
                <Helmet title="User List"/>
                <Breadcrumb />
            </div>
        );
    }

    render() {

        const {children} = this.props;

        return (
            <div>
                {children ? children : this.getUserListComponent()}
            </div>
        );
    }
}
