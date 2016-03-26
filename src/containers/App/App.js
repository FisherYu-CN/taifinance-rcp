import React, {Component, PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import Helmet from 'react-helmet';
import config from '../../config';

@injectIntl
export default class App extends Component {

    static propTypes = {
        intl: intlShape.isRequired,                     // 国际化API
        children: PropTypes.element.isRequired          // 子级组件
    };

    render() {

        const {intl, children} = this.props;

        return (
            <div>
                <Helmet {...config.app.head}/>
                <div>{React.cloneElement(children, {intl: intl})}</div>
            </div>
        );
    }
}
