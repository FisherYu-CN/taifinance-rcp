import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class Roles extends Component {

    static propTypes = {
        children: PropTypes.element                // 嵌套的子级菜单
    };

    /**
     * 获取角色列表组件
     *
     * @return {Object} 角色列表组件
     */
    getRoleListComponent = () => {
        return (
            <div>
                <Helmet title="Role List"/>
                <Breadcrumb />
            </div>
        );
    }

    render() {

        const {children} = this.props;

        return (
            <div>
                {children ? children : this.getRoleListComponent()}
            </div>
        );
    }
}
