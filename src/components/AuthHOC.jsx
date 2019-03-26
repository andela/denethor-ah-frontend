import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const authHOC = (AuthencticatedComponent) => {
  class AuthHOC extends Component {
    componentDidUpdate () {
      if (this.props.isLoggedIn === false) {
        this.props.history.push('/login')
      }
    }

    render() {
      return <AuthencticatedComponent {...this.props}/>
    }
  }

  AuthHOC.propTypes = {
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object
  }

  return AuthHOC;
}

const ConnectedAuthHOC = (Component) => {
  const AuthComponent = authHOC(Component);
  const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });
  return connect(mapStateToProps)(AuthComponent);
}

export default ConnectedAuthHOC;