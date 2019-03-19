import React, { Component } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import PropTypes from 'prop-types';
import '../redirect/styles.scss';

export class  UnsubscribeNotification extends Component {
  async componentDidMount() {
    try {
      const link = `${process.env.API_ROOT_URL}/users/${this.props.match.params.id}/unsubscribe`;
      const { data: { message } } = await axios.patch(link);
      this.props.history.push('/');
      toast.success(message, { className: 'toast-custom-style' });
    } catch({ response }) {
          toast.error('Unknown error. Try again',  { className: 'toast-custom-style' });
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
UnsubscribeNotification.propTypes = { 
  history: PropTypes.object,
  match: PropTypes.object
}
export default UnsubscribeNotification;