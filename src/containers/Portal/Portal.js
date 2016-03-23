import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {TopNavbar, Sidebar, Breadcrumb, Footer} from 'components';

export default class Portal extends Component {

    static propTypes = {
        children: PropTypes.object
    };

    /**
     * 获取首页组件
     *
     * @return {Object} 首页组件
     */
    getHomeComponent = () => {
        return (
            <div>
                <Helmet title="Home"/>
                <Breadcrumb />
                <span>Home</span>
            </div>
        );
    }

    render() {

        const {children} = this.props;

        return (
            <div id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="gray-bg">
                    <TopNavbar />
                    <div>
                        {children ? children : this.getHomeComponent()}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
