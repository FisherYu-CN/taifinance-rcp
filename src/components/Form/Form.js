import React, {Component, PropTypes} from 'react';

export default class Form extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,               // 提交表单处理函数
        showErrorOnlyOnSubmit: PropTypes.bool,             // 在提交时显示错误信息
        submitFailed: PropTypes.bool,                       // 表单提交失败
        children: PropTypes.oneOfType([                     // 具体表单字段
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]).isRequired
    };

    render() {

        const {onSubmit, showErrorOnlyOnSubmit, submitFailed, children} = this.props;

        return (
            <form className="m-t" onSubmit={onSubmit} noValidate>
                {React.Children.map(children, element => {
                    return React.cloneElement(element, {showErrorOnlyOnSubmit: showErrorOnlyOnSubmit, submitFailed: submitFailed});
                })}
            </form>
        );
    }
}
