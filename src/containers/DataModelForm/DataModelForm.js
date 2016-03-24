import React, {Component, PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

export default class DataModelForm extends Component {

    static propTypes = {
        id: PropTypes.string
    };

    render() {

        const {id} = this.props;

        return (
            <div>
                <Helmet title="Data Model Form"/>
                <Breadcrumb>
                    {id ? <FormattedMessage id="datamodel.edit.module" /> : <FormattedMessage id="datamodel.new.module" />}
                </Breadcrumb>
            </div>
        );
    }
}
