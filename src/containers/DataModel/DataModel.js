import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    dataModelDisplayModule: {
        id: 'datamodel.display.module',
        defaultMessage: 'Data Model',
    }
});

export default class DataModel extends Component {

    static propTypes = {
        intl: intlShape                           // 国际化API
    };

    render() {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.dataModelDisplayModule)}/>
                <Breadcrumb subTitle={formatMessage(messages.dataModelDisplayModule)} {...props} />
            </div>
        );
    }
}
