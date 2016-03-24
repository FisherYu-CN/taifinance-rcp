import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class IndustryCommerceEnterprise extends Component {

    render() {
        return (
            <div>
                <Helmet title="Industry Commerce Enterprise"/>
                <Breadcrumb />
            </div>
        );
    }
}
