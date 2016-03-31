import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    phoneNumberCreditLevelModule: {
        id: 'phonenumber.creditlevel.module',
        defaultMessage: 'Phone Number Credit Level'
    }
});

export default class PhoneNumberCreditLevel extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.phoneNumberCreditLevelModule)}/>
                <Breadcrumb {...props} />
            </div>
        );
    }
}
