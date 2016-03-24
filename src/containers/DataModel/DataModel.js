import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class DataModel extends Component {

    render() {
        return (
            <div>
                <Helmet title="Data Model"/>
                <Breadcrumb>
                    <FormattedMessage id="datamodel.display.module" />
                </Breadcrumb>
            </div>
        );
    }
}
