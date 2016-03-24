import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class Industry extends Component {

    render() {
        return (
            <div>
                <Helmet title="Industry"/>
                <Breadcrumb />
            </div>
        );
    }
}
