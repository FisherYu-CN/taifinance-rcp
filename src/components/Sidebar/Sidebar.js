import React, { Component } from 'react';
import {SidebarNav, SidebarNavHeader, SidebarNavItem} from 'components';

export default class Sidebar extends Component {

    render() {
        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <SidebarNav>
                        <SidebarNavHeader />
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
