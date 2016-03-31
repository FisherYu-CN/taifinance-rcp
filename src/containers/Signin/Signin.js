import React, {Component} from 'react';
import {intlShape, defineMessages} from 'react-intl';
import Helmet from 'react-helmet';
import BodyClassName from 'react-body-classname';
import {Input, ButtonInput} from 'react-bootstrap/lib';
import {Link} from 'react-router';

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

export default class Signin extends Component {

	static propTypes = {
        intl: intlShape                           // 国际化API
    };

    handleSubmit = () => {
        alert('haha');
    }

    render() {

        const {formatMessage} = this.props.intl;

        return (
        	<BodyClassName className="gray-bg">
	        	<div className="middle-box text-center loginscreen">
	            	<Helmet title={formatMessage(messages.signinModule)} />
	            	<div>
	                	<h1 className="logo-name">TF</h1>
	                	<h3>{formatMessage(messages.signinTitle)}</h3>
                        <form className="m-t" onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <Input type="text" placeholder={formatMessage(messages.signinInputUsername)} />
                            </div>
                            <div className="form-group">
                                <Input type="text" placeholder={formatMessage(messages.signinInputPassword)} />
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
