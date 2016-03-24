import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class UserProfile extends Component {

    render() {
        return (
            <div>
                <Helmet title="User Profile"/>
                <Breadcrumb />
            </div>
        );
    }
}
