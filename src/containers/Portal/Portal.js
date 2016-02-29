import React, { Component, PropTypes } from 'react';
import { Header, Sidebar, Footer } from 'components';

export default class Portal extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        return (
            <div id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="gray-bg">
                    <Header />
                    <div>{this.props.children}</div>
                    <Footer />
                </div>
            </div>
        );
    }
}
