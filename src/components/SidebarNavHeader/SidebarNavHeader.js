import React, {Component, PropTypes} from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';

export default class SidebarNavHeader extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,              // 用户信息
        children: React.PropTypes.oneOfType([           // 快捷菜单项
            React.PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    };

    // 组件渲染逻辑
    render() {

        const {user, children} = this.props;
        const {name, company, profileImageUrl} = user;


        return (
            <li className="nav-header">
                <Dropdown id="nav-header-dropdown" className="profile-element">
                    <img className="img-circle" src={profileImageUrl} />
                    <a bsRole="toggle">
                        <span className="clear">
                            <span className="block m-t-xs">
                                <strong className="font-bold">{name}</strong>
                             </span>
                            <span className="text-muted text-xs block">
                                {company}
                                <b className="caret"></b>
                            </span>
                        </span>
                    </a>
                    <Dropdown.Menu className="m-t-xs">
                        {children}
                    </Dropdown.Menu>
                </Dropdown>
                <div className="logo-element">TF</div>
            </li>
        );
    }
}
