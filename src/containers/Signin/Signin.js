import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import BodyClassName from 'react-body-classname';
import {Input, ButtonInput} from 'react-bootstrap/lib';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {FormGroup} from 'components';
import signinValidation from './SigninValidation';

// 定义国际化信息
const messages = defineMessages({
    signinModule: {
        id: 'signin.module',
        defaultMessage: 'Sign in'
    },
    signinTitle: {
        id: 'signin.title',
        defaultMessage: 'TaiFinance Risk Control Platform'
    },
    signinInputUsername: {
        id: 'signin.input.username',
        defaultMessage: 'Username'
    },
    signinInputPassword: {
        id: 'signin.input.password',
        defaultMessage: 'Password'
    },
    signinInputSignin: {
        id: 'signin.input.signin',
        defaultMessage: 'Signin'
    },
    signinLinkForgot: {
        id: 'signin.link.forgot',
        defaultMessage: 'Forgot your password?'
    },
    signinLinkRegisterHint: {
        id: 'signin.link.register.hint',
        defaultMessage: 'Do not have an account?'
    },
    signinLinkRegister: {
        id: 'signin.link.register',
        defaultMessage: 'Create an account'
    }
});

@reduxForm({
    form: 'signin',
    fields: ['username', 'password'],
    validate: signinValidation
})
export default class Signin extends Component {

	static propTypes = {
        intl: intlShape,                                // 国际化API
        fields: PropTypes.object.isRequired,           // 表单字段
        handleSubmit: PropTypes.func.isRequired        // 提交表单函数
    };

    submitForm = () => {
        alert('haha');
    }

    render() {

        const {intl: {formatMessage}, fields: {username, password}, handleSubmit} = this.props;

        return (
        	<BodyClassName className="gray-bg">
	        	<div className="middle-box text-center loginscreen">
	            	<Helmet title={formatMessage(messages.signinModule)} />
	            	<div>
	                	<h1 className="logo-name">TF</h1>
	                	<h3>{formatMessage(messages.signinTitle)}</h3>
                        <p>Risk Control Platform</p>
                        <form className="m-t" onSubmit={handleSubmit(this.submitForm)} noValidate>
                            <FormGroup field={username}>
                                <Input type="text" placeholder={formatMessage(messages.signinInputUsername)} />
                            </FormGroup>
                            <div className="form-group">
                                <Input type="text" placeholder={formatMessage(messages.signinInputPassword)} {...password} />
                            </div>
                            <ButtonInput type="submit" bsStyle="primary" className="block full-width m-b" value={formatMessage(messages.signinInputSignin)} />
                            <Link to="/forgot">
                                <small>{formatMessage(messages.signinLinkForgot)}</small>
                            </Link>
                            <p className="text-muted text-center">
                                <small>{formatMessage(messages.signinLinkRegisterHint)}</small>
                                <Link to="/signup">
                                    <small>{formatMessage(messages.signinLinkRegister)}</small>
                                </Link>
                            </p>
                        </form>
	    			</div>
	    		</div>
        	</BodyClassName>
        );
    }
}
