import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class Industries extends Component {

    static propTypes = {
        children: PropTypes.element                // 嵌套的子级菜单
    };

    render() {

        const {children} = this.props;

        return (
            <div>
                {children ? children :
                    <div>
                        <Helmet title="IndustryList"/>
                        <span>Industry List</span>
                    </div>
                }
            </div>
        );
    }
}
