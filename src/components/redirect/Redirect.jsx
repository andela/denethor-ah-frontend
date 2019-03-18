import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast} from 'react-toastify';
import PropTypes from 'prop-types';

import { setLoggedInState } from '../../redux/actions/auth';
import './styles.scss';

export class Loading extends Component {
  async componentDidMount() {
    try {
      const link = `${process.env.API_ROOT_URL}/users/${this.props.match.params.id}/verify`;
      const { data: { data: { user: { token } } } } = await axios.patch(link);
      window.localStorage.setItem('token', token);
      toast.success('Email verified', { className: 'toast-custom-style' });
      this.props.history.push('/dashboard');
      this.props.dispatch(setLoggedInState);
    } catch({ response, response: { status } }) {
      switch (status) {
        case 400:
        toast.error('You are already verified, try logging in', { className: 'toast-custom-style' });
        this.props.history.push('/login');
        return;

        case 404:
          toast.error('User not found, make sure you are registered',  { className: 'toast-custom-style' });
          break;

        default:
          toast.error('Unknown error. Try again',  { className: 'toast-custom-style' });
        }      
        this.props.history.push('/signup');
      }
  }

  render() {
    return (
      <div className="redirect-page">
        <div className="spinner-container-redirect-page">
          <div className="spinner spinner--redirect-page"></div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = { 
  history: PropTypes.object,
  match: PropTypes.object,
  dispatch: PropTypes.function
}

export default connect()(Loading);
