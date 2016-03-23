import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {TopNavbar, Sidebar, Footer} from 'components';

export default class Portal extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {

        const {children} = this.props;

        return (
            <div id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="gray-bg">
                    <TopNavbar />
                    <div>
                        {children ? children :
                            <div>
                                <Helmet title="Home"/>
                                <span>Home</span>
                            </div>
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
