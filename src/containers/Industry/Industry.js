import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    industryDisplayModule: {
        id: 'industry.display.module',
        defaultMessage: 'Industry'
    }
});

export default class Industry extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.industryDisplayModule)}/>
                <Breadcrumb subTitle={formatMessage(messages.industryDisplayModule)} {...props} />
            </div>
        );
    }
}
