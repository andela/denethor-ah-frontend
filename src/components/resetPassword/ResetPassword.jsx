import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmail, isAlphanumeric } from 'validator';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';
import resetPassword from './axiosCall';
import './styles.scss';

export class ResetPassword extends Component {
  state = {
    buttonDisabled: false,
    confirmPassword: '',
    password: '',
    passordErrorMessage: '',
    confirmPasswordErrorMessage: '',
    toastId: 'toast',
    token: ''
  }

  componentDidMount() {
    if (document.location.hash.includes('token')) {
      const token = document.location.hash.slice(7);
      this.setState({ token })
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  onPasswordChange = ({ target: { value: password } }) => {
    this.setState({
      password,
      passwordErrorMessage: ''
    });
  }

  onConfirmPasswordChange = ({ target: { value: confirmPassword } }) => {
    this.setState({
      confirmPassword,
      confirmPasswordErrorMessage: '',
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
  onConfirmPasswordBlur = () => {
    const { confirmPassword, password } = this.state;
    if (password !== confirmPassword) {
      return this.setState({ confirmPasswordErrorMessage: 'Passwords do not match.' })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { toastId, password, token } = this.state;
    if (!password) {
      return this.setState({ passwordErrorMessage: 'Please enter your password.' });
    }

    localStorage.clear();
    this.setState({ buttonDisabled: true });

    const res = await resetPassword(password, token);

    this.setState({ buttonDisabled: false });

    if (!isEmail(res)) {
      return toast.error(res, {
        hideProgressBar: true,
        toastId,
        className: 'toast-custom-style toast-reset-password'
      });
    }

    toast.success('Password set successfully', {
      autoClose: true,
      hideProgressBar: true,
      toastId,
      className: 'toast-custom-style toast-reset-password'
    });

    const serverErrorMessage = await this.props.handleLogin({
      email: res, password
    });

    if (!this.props.isLoggedIn) {
      toast.error(serverErrorMessage, {
        hideProgressBar: true,
        toastId,
        className: 'toast-custom-style toast-reset-password'
      });
    }
    this.props.history.push('/dashboard');
  }

  render() {
    const {
      buttonDisabled,
      confirmPassword,
      confirmPasswordErrorMessage,
      password,
      passwordErrorMessage,
    } = this.state;

    const disableButton = buttonDisabled || confirmPasswordErrorMessage|| passwordErrorMessage;

    return (
      <div className='flex modal-wrapper'>
        <div className='modal-form-container'>
          <div className='modal-header'>
            <div className="logo-container">
                <h3>Enter Password</h3>
            </div>
          </div>
          <div className='reset-password-form__container'>
            <form className='reset-password-form__form'>
              <div>
                <small className='password-error-message'>
                  &nbsp;{passwordErrorMessage}
                </small>
                <input
                  className={passwordErrorMessage && 'red-bg'}
                  type='password'
                  name='password'
                  placeholder='password'
                  value={password}
                  onChange={this.onPasswordChange}
                  onBlur={this.onPasswordBlur}
                  required
                />
              </div>

              <div>
                <small className='password-error-message'>
                  &nbsp;{confirmPasswordErrorMessage}
                </small>
                <input
                  className={confirmPasswordErrorMessage && 'red-bg'}
                  type='password'
                  name='confirm-password'
                  onBlur={this.onConfirmPasswordBlur}
                  placeholder='confirm password'
                  value={confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                  required
                />
              </div>
              <button
                disabled={disableButton}
                className='button button--primary'
                onClick={this.handleSubmit}
              >
                <span className={`button__text--login ${buttonDisabled ? 'hidden' : undefined}`}>
                  Submit
                </span>
                <span className={buttonDisabled ? 'spinner spinner--button' : undefined}></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export const mapDispatchToProps = (dispatch) => ({
  handleLogin: (payload) => dispatch(login(payload))
});

ResetPassword.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
