import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    phoneNumberValidityModule: {
        id: 'phonenumber.validity.module',
        defaultMessage: 'Phone Number Validity'
    }
});

export default class PhoneNumberValidity extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.phoneNumberValidityModule)}/>
                <Breadcrumb {...props} />
            </div>
        );
    }
}
