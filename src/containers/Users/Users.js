import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    userListModule: {
        id: 'user.list.module',
        defaultMessage: 'User List'
    }
});

export default class Users extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        children: PropTypes.element                // 子级组件
    };

    /**
     * 获取用户列表组件
     *
     * @return {Object} 用户列表组件
     */
    getUserListComponent = () => {
        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.userListModule)} />
                <Breadcrumb subTitle={formatMessage(messages.userListModule)} {...props} />
            </div>
        );
    }

    render() {

        const {children, ...props} = this.props;

        return (
            <div>
                {children ? React.cloneElement(children, {...props}) : this.getUserListComponent()}
            </div>
        );
    }
}
