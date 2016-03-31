import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    roleListModule: {
        id: 'role.list.module',
        defaultMessage: 'Role List'
    }
});

export default class Roles extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        children: PropTypes.element                // 子级组件
    };

    /**
     * 获取角色列表组件
     *
     * @return {Object} 角色列表组件
     */
    getRoleListComponent = () => {
        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.roleListModule)} />
                <Breadcrumb subTitle={formatMessage(messages.roleListModule)} {...props} />
            </div>
        );
    }

    render() {

        const {children, ...props} = this.props;

        return (
            <div>
                {children ? React.cloneElement(children, {...props}) : this.getRoleListComponent()}
            </div>
        );
    }
}
