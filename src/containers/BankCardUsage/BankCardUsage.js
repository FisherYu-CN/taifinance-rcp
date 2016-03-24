import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class BankCardUsage extends Component {

    render() {
        return (
            <div>
                <Helmet title="Bank Card Usage"/>
                <Breadcrumb />
            </div>
        );
    }
}
