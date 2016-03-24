import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class PhoneNumberAmount extends Component {

    render() {
        return (
            <div>
                <Helmet title="Phone Number Amount"/>
                <Breadcrumb />
            </div>
        );
    }
}
