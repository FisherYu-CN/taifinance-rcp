import React, {Component, PropTypes} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import BodyClassName from 'react-body-classname';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {FormControl, Button} from 'react-bootstrap/lib';
import {Form, FormGroup, FormGroupError, FormAlert} from 'components';
import * as authActions from 'redux/modules/auth';
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
    signinInputUsernameErrorRequired: {
        id: 'signin.input.username.error.required',
        defaultMessage: 'Please fill the username'
    },
    signinInputPassword: {
        id: 'signin.input.password',
        defaultMessage: 'Password'
    },
    signinInputPasswordErrorRequired: {
        id: 'signin.input.password.error.required',
        defaultMessage: 'Please fill the password'
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

@connect(
    state => ({
        signinError: state.auth.signinError
    }),
    dispatch => bindActionCreators(authActions, dispatch)
)
@reduxForm({
    form: 'signin',
    fields: ['username', 'password'],
    validate: signinValidation
})
export default class Signin extends Component {

	static propTypes = {
        signin: PropTypes.func,                            // 登录ActionCreator
        intl: intlShape,                                   // 国际化API
        fields: PropTypes.object.isRequired,              // 表单字段
        handleSubmit: PropTypes.func.isRequired,         // 提交表单函数
        signinError: PropTypes.string,                     // 登录错误
        clearSigninError: PropTypes.func.isRequired      // 清除登录错误
    };

    submitForm = () => {
        const {signin, fields: {username, password}} = this.props;
        signin(username.value, password.value);
    }

    render() {

        const {intl: {formatMessage}, fields: {username, password}, handleSubmit, signinError, clearSigninError, ...props} = this.props;

        return (
        	<BodyClassName className="gray-bg">
	        	<div className="middle-box text-center loginscreen">
	            	<Helmet title={formatMessage(messages.signinModule)} />
	            	<div>
	                	<h1 className="logo-name">TF</h1>
	                	<h3>{formatMessage(messages.signinTitle)}</h3>
                        <p>Risk Control Platform</p>
                        <Form onSubmit={handleSubmit(this.submitForm)} showErrorOnlyOnSubmit {...props}>
                            <FormGroup field={username}>
                                <FormControl type="text" placeholder={formatMessage(messages.signinInputUsername)} />
                                <FormGroupError type="required" message={formatMessage(messages.signinInputUsernameErrorRequired)} />
                            </FormGroup>
                            <FormGroup field={password}>
                                <FormControl type="password" placeholder={formatMessage(messages.signinInputPassword)} />
                                <FormGroupError type="required" message={formatMessage(messages.signinInputPasswordErrorRequired)} />
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" className="full-width m-b">{formatMessage(messages.signinInputSignin)}</Button>
                            <Link to="/forgot">
                                <small>{formatMessage(messages.signinLinkForgot)}</small>
                            </Link>
                            <p className="text-muted text-center">
                                <small>{formatMessage(messages.signinLinkRegisterHint)}</small>
                                <Link to="/signup">
                                    <small>{formatMessage(messages.signinLinkRegister)}</small>
                                </Link>
                            </p>
                            <FormAlert errorMessage={signinError} clearMessage={clearSigninError} />
                        </Form>
	    			</div>
	    		</div>
        	</BodyClassName>
        );
    }
}
