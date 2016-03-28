import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    industryCreateModule: {
        id: 'industry.create.module',
        defaultMessage: 'Create Industry',
    },
    industryEditModule: {
        id: 'industry.edit.module',
        defaultMessage: 'Edit Industry',
    }
});

export default class IndustryForm extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        params: PropTypes.object                   // 路由参数
    };

    render() {

        const {intl, params, ...props} = this.props;
        const {formatMessage} = intl;
        const {id} = params;

        const title = id ? formatMessage(messages.industryEditModule) : formatMessage(messages.industryCreateModule);

        return (
            <div>
                <Helmet title={title}/>
                <Breadcrumb subTitle={title} intl={intl} {...props} />
            </div>
        );
    }
}
