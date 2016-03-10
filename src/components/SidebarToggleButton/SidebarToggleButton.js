import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sidebarActions from 'redux/modules/sidebar';

@connect(
    state => ({
        minimized: state.sidebar.minimized
    }),
    dispatch => bindActionCreators(sidebarActions, dispatch)
)
export default class SidebarToggleButton extends Component {

    // 组件接受的属性
    static propTypes = {
        toggleSidebar: PropTypes.func       // 切换侧边栏展开/收起状态函数
    };

    onClick() {
        this.props.toggleSidebar();
    }

    render() {

        const styles = require('./SidebarToggleButton.scss');

        return (
            <Button className={styles.sidebarToggleButton} bsStyle="primary" onClick={() => this.onClick()}>
                <i className="fa fa-bars"></i>
            </Button>
        );
    }
}
