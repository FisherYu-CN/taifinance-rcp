import React, {Component} from 'react';
import {SidebarNav, SidebarNavItem} from 'components';

export default class Home extends Component {

    render() {
        return (
            <SidebarNav>
                <SidebarNavItem href="/portal" title="Portal" iconClass="fa-home">
                    <SidebarNav>
                        <SidebarNavItem href="/portal/home" title="Home" />
                        <SidebarNavItem href="/portal/home2" title="Home2" />
                    </SidebarNav>
                </SidebarNavItem>
                <SidebarNavItem href="/signin" title="Signin" iconClass="fa-home" />
            </SidebarNav>
        );
    }
}
