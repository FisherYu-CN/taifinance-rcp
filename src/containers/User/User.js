import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class User extends Component {

    render() {
        return (
            <div>
                <Helmet title="User"/>
                <Breadcrumb />
            </div>
        );
    }
}
