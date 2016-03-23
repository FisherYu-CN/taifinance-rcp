import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class Industries extends Component {

    static propTypes = {
        children: PropTypes.element                // 嵌套的子级菜单
    };

    /**
     * 获取模型行业列表组件
     *
     * @return {Object} 模型行业列表组件
     */
    getIndustryListComponent = () => {
        return (
            <div>
                <Helmet title="IndustryList"/>
                <span>Industry List</span>
            </div>
        );
    }

    render() {

        const {children} = this.props;

        return (
            <div>
                {children ? children : this.getIndustryListComponent()}
            </div>
        );
    }
}
