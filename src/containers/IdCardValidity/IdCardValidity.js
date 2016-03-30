import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    idCardValidityModule: {
        id: 'idcard.validity.module',
        defaultMessage: 'Id Card Validity',
    }
});

export default class IdCardValidity extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.idCardValidityModule)}/>
                <Breadcrumb {...props} />
            </div>
        );
    }
}
