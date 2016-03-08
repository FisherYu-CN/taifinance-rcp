import React, { Component } from 'react';
import {SidebarNav, SidebarNavItem} from 'components';

export default class Sidebar extends Component {

    render() {
        return (
            <nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse">
                    <SidebarNav>
                        <SidebarNavItem href="/portal/home" title="Home" iconClass="fa-home" />
                        <SidebarNavItem title="Test" iconClass="fa-diamond">
                            <SidebarNav>
                                <SidebarNavItem title="Test1">
                                    <SidebarNav>
                                        <SidebarNavItem href="/portal/test/test1/test11" title="Test11" />
                                        <SidebarNavItem href="/portal/test/test1/test12" title="Test12" />
                                    </SidebarNav>
                                </SidebarNavItem>
                                <SidebarNavItem href="/portal/test/test2" title="Test2" />
                            </SidebarNav>
                        </SidebarNavItem>
                        <SidebarNavItem href="/portal/user" title="User" iconClass="fa-user" />
                    </SidebarNav>
                </div>
            </nav>
        );
    }
}
