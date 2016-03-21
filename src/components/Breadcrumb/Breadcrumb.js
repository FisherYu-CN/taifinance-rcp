import React, {Component, PropTypes} from 'react';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';

@connect(
    state => ({
        navItems: state.sidebar.navItems,
        navItemsStatus: state.sidebar.navItemsStatus
    })
)
export default class Breadcrumb extends Component {

    static propTypes = {
        navItems: PropTypes.object,                 // 导航项信息
        navItemsStatus: PropTypes.object           // 导航项状态
    };

    render() {
        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <Col lg={10}>
                    <h2>Test</h2>
                </Col>
            </div>
        );
    }
}
