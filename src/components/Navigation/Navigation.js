import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';

export default class Navigation extends Component {

    render() {
        return (
            <Nav className="navbar-default navbar-static-side">
                <div className="sidebar-collapse"/>
            </Nav>
        );
    }
}

