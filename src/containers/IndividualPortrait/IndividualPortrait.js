import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class IndividualPortrait extends Component {

    render() {
        return (
            <div>
                <Helmet title="Individual Portrait"/>
                <Breadcrumb />
            </div>
        );
    }
}
