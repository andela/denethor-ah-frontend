import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showLoginModal } from '../../../redux/actions/auth';

class AuthButton extends Component {
  handleClick = () => {
    const { history, history: { location: { pathname } }, type } = this.props;

    if(/^\/((login)?(signup)?)?$/.test(pathname)) {
      return history.push(`/${type.toLowerCase()}`);
    }
    this.props.dispatch(showLoginModal(type));
  }

  toggleModalOff = () => {
    this.props.dispatch(showLoginModal(false));
  }

  render() {
    const {
      props: { type },
      handleClick
    } = this;
    return (
      <div>
        <button
          className={`${type.toLowerCase()}-link`}
          onClick={handleClick}
        >
          {type}
        </button>
      </div>
    );
  }
}

AuthButton.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  type: PropTypes.string,
  showLoginModal: PropTypes.bool
}

const mapStateToProps = ({ auth: { showLoginModal }}) => ({ showLoginModal });

export default connect(mapStateToProps)(withRouter(AuthButton));
