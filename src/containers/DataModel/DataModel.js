import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class DataModel extends Component {

    // 组件接受的属性
    static propTypes = {
        type: PropTypes.string
    };

    render() {
        const {type} = this.props;

        return (
            <div>
                <Helmet title={'Data Model - ' + type}/>
                <span>Data Model - {type}</span>
            </div>
        );
    }
}
