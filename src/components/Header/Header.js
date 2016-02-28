import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';

export default class Header extends Component {

    render() {
        return (
            <div className="row border-bottom">
                <Nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-style-2 btn btn-primary">
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                </Nav>
            </div>
        );
    }
}

