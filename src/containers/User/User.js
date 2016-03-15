import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class User extends Component {

    render() {
        return (
            <div>
                <Helmet title="User"/>
                <span>User</span>
            </div>
        );
    }
}
