import React, {Component, PropTypes} from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class SidebarNavHeader extends Component {

    // 组件接受的属性
    static propTypes = {
        children: PropTypes.element
    };

    // 组件渲染逻辑
    render() {

        const profile = require('./profile.jpg');

        return (
            <li className="nav-header">
                <Dropdown id="nav-header-dropdown" className="profile-element">
                    <img className="img-circle" src={profile} />
                    <a bsRole="toggle">
                        <span className="clear">
                            <span className="block m-t-xs">
                                <strong className="font-bold">Fisher Yu</strong>
                             </span>
                            <span className="text-muted text-xs block">
                                TaiFinance
                                <b className="caret"></b>
                            </span>
                        </span>
                    </a>
                    <Dropdown.Menu className="m-t-xs">
                        <MenuItem href="">Profile</MenuItem>
                        <MenuItem href="">Contacts</MenuItem>
                        <MenuItem href="">Mailbox</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="">Logout</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        );
    }
}
