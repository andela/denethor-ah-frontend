import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../../redux/actions/auth';

const AccountWidgetOptions = ({ logout }) => (
  <div className="header__account-widget__account-options">
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>

      <li>
        <Link to="/" onClick={logout}>Log Out</Link>
      </li>
    </ul>
  </div>
);

AccountWidgetOptions.propTypes = {
  logout: PropTypes.func
};

const mapDispatchToProps = dispatch => ({ logout: () => dispatch(logout()) });

export default connect(undefined, mapDispatchToProps)(AccountWidgetOptions);
