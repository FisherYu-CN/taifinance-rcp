import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class UserProfile extends Component {

    render() {
        return (
            <div>
                <Helmet title="User Profile"/>
                <span>User Profile</span>
            </div>
        );
    }
}
