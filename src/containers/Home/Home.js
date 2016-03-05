import React, {Component} from 'react';
import {SidebarNav, SidebarNavItem} from 'components';

export default class Home extends Component {

    render() {
        return (
            <SidebarNav>
                <SidebarNavItem href="/portal" title="Portal" iconClass="fa-home">
                    <SidebarNav>
                        <SidebarNavItem href="/portal/home1" title="Home1">
                            <SidebarNav>
                                <SidebarNavItem href="/portal/home11" title="Home11" />
                                <SidebarNavItem href="/portal/home12" title="Home12" />
                            </SidebarNav>
                        </SidebarNavItem>
                        <SidebarNavItem href="/portal/home2" title="Home2" />
                    </SidebarNav>
                </SidebarNavItem>
                <SidebarNavItem href="/signin" title="Signin" iconClass="fa-home" />
            </SidebarNav>
        );
    }
}
