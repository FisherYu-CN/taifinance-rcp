import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class Role extends Component {

    render() {
        return (
            <div>
                <Helmet title="Role"/>
                <Breadcrumb />
            </div>
        );
    }
}
