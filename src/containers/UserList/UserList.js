import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class UserList extends Component {

    render() {
        return (
            <div>
                <Helmet title="User List"/>
                <span>User List</span>
            </div>
        );
    }
}
