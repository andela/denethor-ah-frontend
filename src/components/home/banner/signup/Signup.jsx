import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isAlphanumeric } from 'validator';
import '@babel/polyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SocialLoginBtn from '../login/SocialLoginBtn';
import SocialLoginIcons from '../login/SocialLoginIcons';
import signUp from '../../../../utils/signUp';
import './styles.scss';
import { switchQuickAuthAction } from '../../../../redux/actions/auth';

export class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    firstnameError: "",
    lastnameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    disableButton: false,
    displaySpinner: false,
    toastOptions: {
      hideProgressBar: true,
      closeButton: false,
      toastId: "signUpToast",
      className: "toast-custom-style"
    }
  };

  componentWillUnmount() {
    toast.dismiss(this.state.toastOptions.toastId);
  }

  componentDidMount() {
    const shouldAlert = (new URL(document.location).searchParams).get('mailalert') === 'true';
    if (shouldAlert) {
      toast.success('Sign up successful. Please verify your email and set password to access your account');
      history.pushState('', document.title, window.location.pathname);
    }
  }

  createToastError = (msg, options) => {
    const { state: { toastOptions: { toastId } } } = this;

    if (toast.isActive(toastId)) {
      return toast.update(toastId, { render: msg });
    }
    return toast.error(msg, options);
  }

  onFirstNameChange = ({ target: { value } }) => {
    this.setState(() => ({
      firstname: value,
      firstnameError: "",
      disableButton: false,
      displaySpinner: false
    }));
  };

  onLastNameChange = ({ target: { value } }) => {
    this.setState(() => ({
      lastname: value,
      lastnameError: "",
      disableButton: false,
      displaySpinner: false
    }));
  };

  onUsernameChange = ({ target: { value } }) => {
    this.setState(() => ({
      username: value,
      usernameError: "",
      disableButton: false,
      displaySpinner: false
    }));
  };

  onEmailChange = ({ target: { value } }) => {
    this.setState(() => ({
      email: value,
      emailError: "",
      disableButton: false,
      displaySpinner: false
    }));
  };

  onPasswordChange = ({ target: { value } }) => {
    this.setState(() => ({
      password: value,
      passwordError: "",
      disableButton: false,
      displaySpinner: false
    }));
  };

  onFirstNameBlur = ({ target: { value } }) => {
    if (!value) {
      this.setState(() => ({
        firstnameError: "First name cannot be empty",
        disableButton: true
      }));
    } else {
      this.setState(() => ({ firstnameError: "", disableButton: false }));
    }
  };

  onLastNameBlur = ({ target: { value } }) => {
    if (!value) {
      this.setState(() => ({
        lastnameError: 'Last name cannot be empty',
        disableButton: true
      }));
    } else {
      this.setState(() => ({ lastnameError: "", disableButton: false }));
    }
  };

  onUsernameBlur = ({ target: { value } }) => {
    if (!value) {
      this.setState(() => ({
        usernameError: "Username cannot be empty",
        disableButton: true
      }));
    } else {
      this.setState(() => ({ usernameError: "", disableButton: false }));
    }
  };

  onEmailBlur = ({ target: { value } }) => {
    if (!isEmail(value)) {
      this.setState(() => ({
        emailError: "Invalid email address, please crosscheck",
        disableButton: true
      }));
    } else {
      this.setState(() => ({ emailError: "", disableButton: false }));
    }
  };

  onPasswordBlur = ({ target: { value } }) => {
    if (value.length < 8 || !isAlphanumeric(value)) {
      this.setState(() => ({
        passwordError: "Password must be alphanumeric with 8 or more characters",
        disableButton: true
      }));
    } else {
      this.setState(() => ({ passwordError: "", disableButton: false }));
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      state: { firstname, lastname, username, email, password, toastOptions },
      createToastError
    } = this;

    const input = firstname || lastname || username || email || password;
    if (!input) {
      return createToastError('Input field(s) cannot be empty', toastOptions);
    }

    this.setState(() => ({ disableButton: true, displaySpinner: true }));
    const { error, message } = await signUp({ firstname, lastname, username, email, password });
    if (error) {
      this.setState(() => ({ displaySpinner: false }))
      return createToastError(message, toastOptions);
    }

    if (toast.isActive(toastOptions.toastId)) {
      toast.dismiss(toastOptions.toastId);
    }
    this.setState(() => ({ disableButton: false, displaySpinner: false }))
    return toast.success(message, toastOptions);
  };

  render() {
    const {
      state: {
        firstname, lastname, username, email, password, firstnameError, lastnameError,
        usernameError, emailError, passwordError, disableButton, displaySpinner, toastOptions
      },
      props: { isLoggedIn },
      createToastError
    } = this;

    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    const inputError = firstnameError || lastnameError || usernameError || emailError || passwordError

    if (inputError) {
      createToastError(inputError, toastOptions);
    } else if (toast.isActive(toastOptions.toastId)) {
      toast.dismiss(toastOptions.toastId)
    }

    return (
      <div className="flex modal">
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
        <div className="register-block">
          <SocialLoginBtn />
          <form className='register-block__form' onSubmit={this.onSubmit}>
            <input
              type='text'
              className={firstnameError ? 'red-bg' : undefined}
              placeholder='first name'
              value={firstname}
              onChange={this.onFirstNameChange}
              onBlur={this.onFirstNameBlur}
            />
            <input
              type='text'
              className={lastnameError ? 'red-bg' : undefined}
              placeholder='last name'
              value={lastname}
              onChange={this.onLastNameChange}
              onBlur={this.onLastNameBlur}
            />
            <input
              type='text'
              className={usernameError ? 'red-bg' : undefined}
              placeholder='username'
              value={username}
              onChange={this.onUsernameChange}
              onBlur={this.onUsernameBlur}
            />
            <input
              type='email'
              className={emailError ? 'red-bg' : undefined}
              placeholder='email'
              value={email}
              onChange={this.onEmailChange}
              onBlur={this.onEmailBlur}
            />
            <input
              type='password'
              className={passwordError ? 'red-bg' : undefined}
              placeholder='password'
              value={password}
              onChange={this.onPasswordChange}
              onBlur={this.onPasswordBlur}
            />
            <button className='button button--primary' disabled={disableButton}>
              <span
                className={`button__text--login ${displaySpinner ? 'hidden' : undefined}`}
              >
                Sign Up
              </span>
              <span
                className={displaySpinner ? 'spinner spinner--button' : undefined}
              />
            </button>
          </form>
          <SocialLoginIcons 
            quickAuthAction={this.props.quickAuthAction}
            switchQuickAuthAction={(link) => this.props.switchQuickAuthAction(link)}
          />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signUp: PropTypes.func,
  addUser: PropTypes.func,
  errorMessage: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  quickAuthAction: PropTypes.object,
  switchQuickAuthAction: PropTypes.func
};

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
  switchQuickAuthAction
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);