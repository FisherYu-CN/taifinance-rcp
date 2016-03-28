import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import BodyClassName from 'react-body-classname';

export default class SidebarToggleButton extends Component {

    static propTypes = {
        minimized: PropTypes.bool,          // 侧边栏是否最小化
        toggleSidebar: PropTypes.func       // 切换侧边栏展开/收起状态函数
    };

    onClick = () => {
        const {toggleSidebar} = this.props;
        toggleSidebar();
    }

    render() {

        const {minimized} = this.props;
        const styles = require('./SidebarToggleButton.scss');

        return (
            <BodyClassName className={minimized ? 'mini-navbar' : ''}>
                <Button className={styles.sidebarToggleButton} bsStyle="primary" onClick={this.onClick}>
                    <i className="fa fa-bars"></i>
                </Button>
            </BodyClassName>
        );
    }
}
