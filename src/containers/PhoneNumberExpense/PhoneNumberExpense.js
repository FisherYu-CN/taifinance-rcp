import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    phoneNumberExpenseModule: {
        id: 'phonenumber.expense.module',
        defaultMessage: 'Phone Number Expense'
    }
});

export default class PhoneNumberExpense extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.phoneNumberExpenseModule)}/>
                <Breadcrumb {...props} />
            </div>
        );
    }
}
