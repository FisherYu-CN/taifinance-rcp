import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    dataModelCreateModule: {
        id: 'datamodel.create.module',
        defaultMessage: 'Create Data Model',
    },
    dataModelEditModule: {
        id: 'datamodel.edit.module',
        defaultMessage: 'Edit Data Model',
    }
});

export default class DataModelForm extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        params: PropTypes.object                   // 路由参数
    };

    render() {

        const {intl, params, ...props} = this.props;
        const {formatMessage} = intl;
        const {id} = params;

        const title = id ? formatMessage(messages.dataModelEditModule) : formatMessage(messages.dataModelCreateModule);

        return (
            <div>
                <Helmet title={title}/>
                <Breadcrumb subTitle={title} intl={intl} {...props} />
            </div>
        );
    }
}
