import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import {Breadcrumb} from 'components';

// 定义国际化信息
const messages = defineMessages({
    industryListModule: {
        id: 'industry.list.module',
        defaultMessage: 'Industry List',
    }
});

export default class Industries extends Component {

    static propTypes = {
        intl: intlShape,                           // 国际化API
        children: PropTypes.element                // 子级组件
    };

    /**
     * 获取模型行业列表组件
     *
     * @return {Object} 模型行业列表组件
     */
    getIndustryListComponent = () => {

        const {intl, ...props} = this.props;
        const {formatMessage} = intl;

        return (
            <div>
                <Helmet title={formatMessage(messages.industryListModule)} />
                <Breadcrumb subTitle={formatMessage(messages.industryListModule)} {...props} />
            </div>
        );
    }

    render() {

        const {children, ...props} = this.props;

        return (
            <div>
                {children ? React.cloneElement(children, {...props}) : this.getIndustryListComponent()}
            </div>
        );
    }
}
