import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class IndustryCommerceIndividual extends Component {

    render() {
        return (
            <div>
                <Helmet title="Industry Commerce Individual"/>
                <Breadcrumb />
            </div>
        );
    }
}
