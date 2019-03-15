import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthModal from '../../authModal';

class AuthButton extends Component {
  state = {
    showModal: false
  }

  handleClick = () => {
    const { history, history: { location: { pathname } }, type } = this.props;

    if(/^\/((login)?(signup)?)?$/.test(pathname)) {
      return history.push(`/${type.toLowerCase()}`);
    }
    this.setState({ showModal: true });
  }

  toggleModalOff = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {
      state: { showModal },
      props: { type },
      handleClick, toggleModalOff
    } = this;
    return (
      <div>
        <button
          className={`${type.toLowerCase()}-link`}
          onClick={handleClick}
        >
          {type}
        </button>

        {showModal && <AuthModal toggleOff={toggleModalOff} content={type} />}
      </div>
    );
  }
}

AuthButton.propTypes = {
  history: PropTypes.object,
  type: PropTypes.string
}

export default withRouter(AuthButton);
