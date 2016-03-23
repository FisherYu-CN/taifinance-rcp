import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class DataModels extends Component {

    static propTypes = {
        children: PropTypes.element                // 嵌套的子级菜单
    };

    /**
     * 获取数据模型列表组件
     *
     * @return {Object} 数据模型列表组件
     */
    getDataModelListComponent = () => {
        return (
            <div>
                <Helmet title="Data Model List"/>
                <span>Data Model List</span>
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
