import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class FormGroup extends Component {

    static propTypes = {
        field: PropTypes.object.isRequired,                // 表单字段
        children: PropTypes.oneOfType([                     // 具体控件
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]).isRequired
    };

    render() {

        const {field, children} = this.props;

        let formGroupClass = classNames({
            'form-group': true,
            'has-error': field.touched && field.invalid
        });

        return (
            <div className={formGroupClass}>
                {React.Children.map(children, element => {
                    return React.cloneElement(element, {...field});
                })}
            </div>
        );
    }
}
