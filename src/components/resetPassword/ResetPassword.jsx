import React, { Component } from 'react';
import { isAlphanumeric } from 'validator';
import PropTypes from 'prop-types';
import '@babel/polyfill';
import { toast } from 'react-toastify';
import './styles.scss';
import resetPassword from './resetPasswordAction';

export class ResetPassword extends Component {
  state = {
    buttonDisabled: false,
    newPassword: '',
    oldPassword: '',
    newPasswordErrorMessage: '',
    oldPasswordErrorMessage: '',
    toastId: 'toast'
  }


  onOldPasswordChange = ({ target: { value: oldPassword } }) => {
    this.setState({
      oldPassword,
      oldPasswordErrorMessage: ''
    });
  }

  onNewPasswordChange = ({ target: { value: newPassword } }) => {
    this.setState({
      newPassword,
      newPasswordErrorMessage: '',
    });
  }

  onOldPasswordBlur = () => {
    const { oldPassword } = this.state
    if (!oldPassword) {
      return this.setState({ oldPasswordErrorMessage: 'Please enter your Old password.' })
    }
  }

  onNewPasswordBlur = () => {
  const { newPassword, oldPassword } = this.state

  if (!newPassword) {
    return this.setState({ newPasswordErrorMessage: 'Please enter your New password.' })
  }

  if (!isAlphanumeric(newPassword)) {
    return this.setState({ newPasswordErrorMessage: 'Use numbers and letters for password.' })
  }

  if (newPassword.length < 8) {
    return this.setState({ newPasswordErrorMessage: 'Password must be 8 or more characters.' })
  }

  if (oldPassword === newPassword) {
    return  this.setState({newPasswordErrorMessage: 'New password must be different.'})
  }
}

  handleSubmit = (e) => {
    e.preventDefault();
    const { toastId, oldPassword, newPassword } = this.state;
    if (!oldPassword) {
      return this.setState({ oldPasswordErrorMessage: 'Please enter your Old password.' });
    }
    if (!newPassword) {
      return this.setState({ newPasswordErrorMessage: 'Please enter your New password.' });
    }

    this.setState({ buttonDisabled: true });

    this.props.resetPassword(oldPassword, newPassword)
     .then(() => 
     toast.success('Password set successfully', {
      autoClose: true,
      hideProgressBar: true,
      toastId
    })
    )
     .catch(error => {
       const { response } = error;
       if (response && response.status === 422){
        return toast.error(response.data.data.input, {
          hideProgressBar: true,
          autoClose: true,
          toastId
        });
      }
      if(response && response.status === 403){
        return toast.error(response.data.message, {
          hideProgressBar: true,
          autoClose: true,
          toastId
        });
      }
      if (response && response.status === 500){
        return toast.error('Server error', {
        hideProgressBar: true,
        autoClose: true,
        toastId
      });
      }
      else{toast.error('unKnown error', {
        hideProgressBar: true,
        autoClose: true,
        toastId
      });
      }
      })
    this.setState({ buttonDisabled: false });

  }

  render() {
    const {
      buttonDisabled,
      newPassword,
      oldPasswordErrorMessage,
      oldPassword,
      newPasswordErrorMessage,
    } = this.state;

    const disableButton = buttonDisabled || oldPasswordErrorMessage || newPasswordErrorMessage;

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
                  &nbsp;{oldPasswordErrorMessage}
                </small>
                <input
                  className={oldPasswordErrorMessage && 'red-bg'}
                  type='password'
                  name='password'
                  placeholder='Old Password'
                  value={oldPassword}
                  onChange={this.onOldPasswordChange}
                  onBlur={this.onOldPasswordBlur}
                  required
                />
              </div>

              <div>
                <small className='password-error-message'>
                  &nbsp;{newPasswordErrorMessage}
                </small>
                <input
                  className={newPasswordErrorMessage && 'red-bg'}
                  type='password'
                  name='confirm-password'
                  onBlur={this.onNewPasswordBlur}
                  placeholder='New Password'
                  value={newPassword}
                  onChange={this.onNewPasswordChange}
                  required
                />
              </div>
              <button
                disabled={disableButton}
                className='button button--primary'
                onClick={this.handleSubmit}
                name ='submit'
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
ResetPassword.propTypes = { 
  resetPassword: PropTypes.func
}
ResetPassword.defaultProps = {
  resetPassword
}
export default (ResetPassword);
