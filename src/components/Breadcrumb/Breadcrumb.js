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
        navItemsStatus: PropTypes.object,          // 导航项状态
        children: PropTypes.element
    };

    render() {

        const {children, navItems, navItemsStatus} = this.props;

        // 查找激活的叶导航项
        let activatedLeafNavItem;
        for (let id in navItems) {
            if (navItems.hasOwnProperty(id) && !navItems[id].hasChildren && navItemsStatus[id].active) {
                activatedLeafNavItem = navItems[id];
            }
        }

        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <Col lg={10}>
                    <h2>{children ? children : activatedLeafNavItem.titleId}</h2>
                </Col>
            </div>
        );
    }
}
