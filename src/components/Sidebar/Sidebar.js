import React, { Component } from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {SidebarNav, SidebarNavHeader, SidebarNavItem} from 'components';

export default class Sidebar extends Component {

    render() {

        // FIX: 暂时使用硬编码，之后再获取用户信息代替
        const name = 'Fisher Yu';
        const company = 'TaiFinance';
        const profileImageUrl = require('./profile.jpg');

        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <SidebarNav>
                        { /* 侧边导航栏标题栏 */ }
                        <SidebarNavHeader name={name} company={company} profileImageUrl={profileImageUrl}>
                            <MenuItem href="/portal/users/profile">Edit Profile</MenuItem>
                            <MenuItem href="/portal/users/password">Change Password</MenuItem>
                            <MenuItem divider />
                            <MenuItem href="/api/auth/signout">Sign Out</MenuItem>
                        </SidebarNavHeader>

                        { /* 侧边导航栏导航项 */ }
                        <SidebarNavItem id="home" href="/portal/home" title="Home" iconClass="fa-home" />
                        <SidebarNavItem id="test" title="Test" iconClass="fa-diamond">
                            <SidebarNav>
                                <SidebarNavItem id="test1" title="Test1">
                                    <SidebarNav>
                                        <SidebarNavItem id="test11" href="/portal/test/test1/test11" title="Test11" />
                                        <SidebarNavItem id="test12" href="/portal/test/test1/test12" title="Test12" />
                                    </SidebarNav>
                                </SidebarNavItem>
                                <SidebarNavItem id="test2" href="/portal/test/test2" title="Test2" />
                            </SidebarNav>
                        </SidebarNavItem>
                        <SidebarNavItem id="user" href="/portal/user" title="User" iconClass="fa-user" />
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
