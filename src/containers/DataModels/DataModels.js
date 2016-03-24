import React, {Component, PropTypes} from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    dataModelListModule: {
        id: 'datamodel.list.module',
        defaultMessage: 'Data Model List',
    }
});

@injectIntl
export default class DataModels extends Component {

    static propTypes = {
        intl: intlShape.isRequired,
        children: PropTypes.element                // 嵌套的子级菜单
    };

    /**
     * 获取数据模型列表组件
     *
     * @return {Object} 数据模型列表组件
     */
    getDataModelListComponent = () => {

        const {formatMessage} = this.props.intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.dataModelListModule)}/>
                <Breadcrumb>{formatMessage(messages.dataModelListModule)}</Breadcrumb>
            </div>
        );
    }

    render() {

        const {children} = this.props;

        return (
            <div>
                {children ? children : this.getDataModelListComponent()}
            </div>
        );
    }
}
