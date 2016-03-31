import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    roleDisplayModule: {
        id: 'role.display.module',
        defaultMessage: 'Role'
    }
});

export default class User extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.roleDisplayModule)}/>
                <Breadcrumb subTitle={formatMessage(messages.roleDisplayModule)} {...props} />
            </div>
        );
    }
}
