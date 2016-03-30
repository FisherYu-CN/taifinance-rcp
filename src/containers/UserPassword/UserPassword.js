import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    userPasswordModule: {
        id: 'user.password.module',
        defaultMessage: 'Change Password',
    }
});

export default class UserPassword extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.userPasswordModule)}/>
                <Breadcrumb subTitle={formatMessage(messages.userPasswordModule)} {...props} />
            </div>
        );
    }
}
