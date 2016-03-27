import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class BankCardUsage extends Component {

    render() {

        const {...props} = this.props;

        return (
            <div>
                <Helmet title="Bank Card Usage"/>
                <Breadcrumb {...props} />
            </div>
        );
    }
}
