import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class EnterprisePortrait extends Component {

    render() {
        return (
            <div>
                <Helmet title="Enterprise Portrait"/>
                <Breadcrumb />
            </div>
        );
    }
}
