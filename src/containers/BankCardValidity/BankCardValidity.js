import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class BankCardValidity extends Component {

    render() {
        return (
            <div>
                <Helmet title="Bank Card Validity"/>
                <Breadcrumb />
            </div>
        );
    }
}
