import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {FormGroup as BsFormGroup} from 'react-bootstrap/lib';

export default class FormGroup extends Component {

    static propTypes = {
        showErrorOnlyOnSubmit: PropTypes.bool,             // 在提交时显示错误信息
        submitFailed: PropTypes.bool,                       // 表单提交失败
        field: PropTypes.object.isRequired,                // 表单字段
        children: PropTypes.oneOfType([                     // 具体控件
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]).isRequired
    };

    render() {

        const {showErrorOnlyOnSubmit, submitFailed, field, children} = this.props;

        let hasError = false;
        if (showErrorOnlyOnSubmit) {
            hasError = submitFailed && field.invalid;
        } else {
            hasError = field.touched && field.invalid;
        }

        const formGroupClass = classNames({
            'form-group': true,
            'has-error': hasError
        });

        return (
            <BsFormGroup bsClass={formGroupClass}>
                {React.Children.map(children, element => {
                    return React.cloneElement(element, {...field});
                })}
            </BsFormGroup>
        );
    }
}
