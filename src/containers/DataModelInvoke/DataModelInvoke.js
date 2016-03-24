import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class DataModelInvoke extends Component {

    render() {
        return (
            <div>
                <Helmet title="Data Model Invoke"/>
                <Breadcrumb>
                    <FormattedMessage id="datamodel.invoke.module" />
                </Breadcrumb>
            </div>
        );
    }
}
