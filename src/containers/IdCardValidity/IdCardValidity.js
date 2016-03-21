import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class IdCardValidity extends Component {

    render() {
        return (
            <div>
                <Helmet title="Id Card Validity"/>
                <Breadcrumb />
                <span>Id Card Validity</span>
            </div>
        );
    }
}
