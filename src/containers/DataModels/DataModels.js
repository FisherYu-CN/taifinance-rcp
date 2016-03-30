import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    dataModelListModule: {
        id: 'datamodel.list.module',
        defaultMessage: 'Data Model List',
    }
});

export default class DataModels extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        children: PropTypes.element                // 子级组件
    };

    /**
     * 获取数据模型列表组件
     *
     * @return {Object} 数据模型列表组件
     */
    getDataModelListComponent = () => {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.dataModelListModule)} />
                <Breadcrumb subTitle={formatMessage(messages.dataModelListModule)} {...props} />
            </div>
        );
    }

    render() {

        const {children, ...props} = this.props;

        return (
            <div>
                {children ? React.cloneElement(children, {...props}) : this.getDataModelListComponent()}
            </div>
        );
    }
}
