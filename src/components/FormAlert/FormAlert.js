import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class FormAlert extends Component {

    static propTypes = {
        successMessage: PropTypes.string,
        infoMessage: PropTypes.string,
        warningMessage: PropTypes.string,
        errorMessage: PropTypes.string,
        clearMessage: PropTypes.func
    };

    render() {

        const {successMessage, infoMessage, warningMessage, errorMessage, clearMessage} = this.props;

        const formAlertClass = classNames({
            'alert': true,
            'alert-success': successMessage,
            'alert-info': infoMessage,
            'alert-warning': warningMessage,
            'alert-danger': errorMessage,
            'hide': !successMessage && !infoMessage && !warningMessage && !errorMessage
        });

        let alertMessage;
        if (successMessage) {
            alertMessage = successMessage;
        } else if (infoMessage) {
            alertMessage = infoMessage;
        } else if (warningMessage) {
            alertMessage = warningMessage;
        } else if (errorMessage) {
            alertMessage = errorMessage;
        }

        return (
            <div className={formAlertClass} onClick={clearMessage}>{alertMessage}</div>
        );
    }
}
