import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {HelpBlock} from 'react-bootstrap/lib';

export default class FormControlError extends Component {

    static propTypes = {
        type: PropTypes.string.isRequired,                  // 错误类型
        message: PropTypes.string.isRequired,              // 错误信息
        error: PropTypes.string                             // 表单错误
    };

    render() {

        const {type, message, error} = this.props;

        const formControlErrorClass = classNames({
            'help-block': true,
            'error-text': true,
            'hide': !error || error !== type
        });

        return (
            <HelpBlock bsClass={formControlErrorClass}>{message}</HelpBlock>
        );
    }
}
