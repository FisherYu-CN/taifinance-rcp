import React, { Component } from 'react';
import {SidebarToggleButton} from 'components';

export default class TopNavbar extends Component {

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        <SidebarToggleButton />
                    </div>
                </nav>
            </div>
        );
    }
}

