import React, {Component} from 'react';
import {SidebarToggleButton} from 'components';

export default class TopNavbar extends Component {

    render() {

        const {...props} = this.props;

        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        <SidebarToggleButton {...props} />
                    </div>
                </nav>
            </div>
        );
    }
}

