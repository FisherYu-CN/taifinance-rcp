import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class DishonestDebtor extends Component {

    render() {
        return (
            <div>
                <Helmet title="Dishonest Debtor"/>
                <Breadcrumb />
            </div>
        );
    }
}
