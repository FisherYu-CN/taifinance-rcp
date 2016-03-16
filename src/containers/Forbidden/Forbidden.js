import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Forbidden extends Component {

    render() {
        return (
            <div>
                <Helmet title="Forbidden"/>
                <span>Forbiddent</span>
            </div>
        );
    }
}
