import React, { Component } from 'react';
import { isEmail } from 'validator';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import forgotPasswordVerification from './passwordVerificationAction';
import { logout } from '../../redux/actions/auth';
import './styles.scss';

export class ForgotPasswordVerification extends Component {
  state = {
    buttonDisabled: false,
    displaySpinner: false,
    email: '',
    emailError: '',
    toastOptions: {
      hideProgressBar: true,
      closeButton: false,
      toastId: "verificationToast",
      className: "toast-custom-style"
    }
  }

  onEmailChange = ({ target: { value } }) => this.setState({ email: value, buttonDisabled: false });

  onEmailBlur = ({ target: { value } }) => {
    if (!isEmail(value)) {
      this.setState({ emailError: 'Please enter a valid email address', buttonDisabled: true });
    } else {
      this.setState({ emailError: '' });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { state: { email, toastOptions }, props: { dispatch } } = this;

    if (!email) {
      return this.setState({ emailError: 'Please enter a valid email address', buttonDisabled: true });
    }

    this.setState({ buttonDisabled: true, displaySpinner: true });
    const { error, message } = await forgotPasswordVerification({ email });

    if (error) {
      this.setState(() => ({ displaySpinner: false }))
      return toast.error(message, toastOptions);
    }

    if (toast.isActive(toastOptions.toastId)) {
      toast.dismiss(toastOptions.toastId);
    }
    this.setState(() => ({ buttonDisabled: false, displaySpinner: false }))
    toast.success(message, toastOptions);
    return dispatch(logout());
  }

  render() {
    const {
      state: { buttonDisabled, email, emailError, displaySpinner },
      onEmailChange, onEmailBlur
    } = this;

    return (
      <div className='flex modal-wrapper'>
        <div className='modal-form-container'>
          <div className='modal-header'>
            <div className="logo-container">
              <h3>Enter Email</h3>
            </div>
          </div>
          <div className='reset-password-form__container'>
            <form className='reset-password-form__form'>
              <div>
                <small className='password-error-message'>
                  &nbsp;{emailError}
                </small>
                <input
                  className={emailError && 'red-bg'}
                  type='text'
                  name='password'
                  placeholder='email'
                  value={email}
                  onChange={onEmailChange}
                  onBlur={onEmailBlur}
                  required
                />
              </div>
              <button
                disabled={buttonDisabled}
                className='button button--primary'
                onClick={this.handleSubmit}
              >
                <span className={`button__text--login ${displaySpinner ? 'hidden' : undefined}`}>
                  Submit
                </span>
                <span className={displaySpinner ? 'spinner spinner--button' : undefined}></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordVerification.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(ForgotPasswordVerification);
