import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class PhoneNumberExpense extends Component {

    render() {
        return (
            <div>
                <Helmet title="Phone Number Expense"/>
                <Breadcrumb />
            </div>
        );
    }
}
