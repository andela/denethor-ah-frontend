import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { isEmail, isAlphanumeric } from 'validator';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { login, switchQuickAuthAction, deactivateQuickAuthAction } from '../../../../redux/actions/auth';
import SocialLoginBtn from './SocialLoginBtn';
import SocialLoginIcons from './SocialLoginIcons';
import './styles.scss';


export class Login extends Component {
  state = {
    emailErrorMessage: '',
    passwordErrorMessage: '',
    serverErrorMessage: '',
    email: '',
    password: '',
    toastId: 'toast',
  }

  componentWillUnmount() {
    toast.dismiss(this.state.toastId);
    this.props.deactivateQuickAuthAction();
  }

  onEmailChange = ({ target: { value: email } }) => {
    this.setState({
      email,
      emailErrorMessage: '',
      serverErrorMessage: ''
    });
  }

  onEmailBlur = () => {
    const { email } = this.state;
    if (!email) {
      return this.setState({ emailErrorMessage: 'Please enter your email address.' });
    }
    if (!isEmail(this.state.email)) {
      return this.setState({ emailErrorMessage: 'Invalid email address, please crosscheck.' });
    }
  }

  onPasswordChange = ({ target: { value: password } }) => {
    this.setState({
      password,
      passwordErrorMessage: '',
      serverErrorMessage: ''
    });
  }

  onPasswordBlur = () => {
    const { password } = this.state
    if (!password) {
      return this.setState({ passwordErrorMessage: 'Please enter your password.' })
    }

    if (!isAlphanumeric(password)) {
      return this.setState({ passwordErrorMessage: 'Use numbers and letters for password.' })
    }

    if (password.length < 8) {
      return this.setState({ passwordErrorMessage: 'Password must be 8 or more characters.' })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email) {
      return this.setState({ emailErrorMessage: 'Please enter your email address.' });
    }
    if (!password) {
      return this.setState({ passwordErrorMessage: 'Please enter your password.' })
    }
    this.setState({ buttonDisabled: true });

    const serverErrorMessage = await this.props.handleLogin({
      email, password
    });

    if (!this.props.isLoggedIn) {
      this.setState({ buttonDisabled: false });
      this.setState({ serverErrorMessage });
    }
  }

  render() {
    if (this.props.isLoggedIn && this.props.history.location.pathname === '/login') {
      return <Redirect to="/dashboard" />;
    }

    const {
      state: {
        buttonDisabled,
        email,
        emailErrorMessage,
        password,
        passwordErrorMessage,
        serverErrorMessage,
        toastId
      }
    } = this;

    const isActive = id => toast.isActive(id);

    let errorNotFromServer;

    const message = emailErrorMessage || passwordErrorMessage || serverErrorMessage || false;

    if (message) {
      errorNotFromServer = !serverErrorMessage;
      if (!isActive(toastId)) {
        toast.error(message, {
          closeButton: false,
          hideProgressBar: true,
          toastId: toastId,
          className: 'toast-custom-style'
        });
      } else {
        toast.update(toastId, {
          render: message,
        });
      }
    } else if (isActive(toastId)) {
      toast.dismiss(toastId);
    }

    const disableButton = buttonDisabled || errorNotFromServer; // We don't want to disable the button if the toast is a message from the server

    return (
      <div className='flex modal'>
        <div className="logo-container">
          <div className="logo-container__image">
            <img src='/assets/img/ah-logo.svg' alt="Author's haven logo" />
          </div>
          <div className="logo-container__text">
            <h3>AUTHOR&apos;S HAVEN</h3>
          </div>
        </div>
        <Link
          className='modal__close'
          to='/'
        >
          <FontAwesomeIcon
            icon={faTimes}
            color='#ffffff'
            size='2x'
          />
        </Link>
        <div className='login-block'>
          <SocialLoginBtn />
          <form className='login-block__form'>
            <input
              className={this.state.emailErrorMessage && 'red-bg'}
              type='email'
              name='email'
              placeholder='email'
              value={email}
              onChange={this.onEmailChange}
              onBlur={this.onEmailBlur}
              required
            />
            <input
              className={this.state.passwordErrorMessage && 'red-bg'}
              type='password'
              name='password'
              onBlur={this.onPasswordBlur}
              placeholder='password'
              value={password}
              onChange={this.onPasswordChange}
              required
            />
            <button
              disabled={disableButton}
              className='button button--primary'
              onClick={this.handleSubmit}
            >
              <span className={`button__text--login ${buttonDisabled ? 'hidden' : undefined}`}>
                Login
              </span>
              <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
            </button>
          </form>
          <SocialLoginIcons 
            quickAuthAction={this.props.quickAuthAction}
            switchQuickAuthAction={(link) => this.props.switchQuickAuthAction(link)}
          />
          <div className='break'></div>
          <div className='reset-password'>
            Forgot Password? <Link to='/forgotPassword/verify'>Click here</Link>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps ({ 
  auth: { isLoggedIn },
  elementStatuses: { quickAuthAction },
}) {
  return { 
    isLoggedIn,
    quickAuthAction,
  }
}

const mapDispatchToProps = ({
  handleLogin: login,
  switchQuickAuthAction,
  deactivateQuickAuthAction
});


Login.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  quickAuthAction: PropTypes.object,
  switchQuickAuthAction: PropTypes.func,
  deactivateQuickAuthAction: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
