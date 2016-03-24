import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class CourtEnforcement extends Component {

    render() {
        return (
            <div>
                <Helmet title="Court Enforcement"/>
                <Breadcrumb />
            </div>
        );
    }
}
