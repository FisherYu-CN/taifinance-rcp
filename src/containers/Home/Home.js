import React, {Component} from 'react';
import {SidebarNav, SidebarNavItem} from 'components';

export default class Home extends Component {

    render() {
        return (
            <SidebarNav>
                <SidebarNavItem href="/portal" title="Portal" iconClass="fa-home" />
                <SidebarNavItem href="/signin" title="Signin" iconClass="fa-home" />
            </SidebarNav>
        );
    }
}
