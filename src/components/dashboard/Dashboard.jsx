import React, { Component } from 'react';
import { setLoggedInState } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOwnProfile } from '../../redux/actions/profile';
import { toast } from 'react-toastify';

export class Dashboard extends Component {
  async componentDidMount() {
    if (document.location.hash.includes('token')) {
      const token = document.location.hash.slice(7);
      history.pushState('', document.title, window.location.pathname + window.location.search);

      let userId;

      try {
        userId = JSON.parse(window.atob(token.split('.')[1])).id;
      } catch (error) {
        this.props.history.push('/login');
      }

      if (userId) {
        const error = await this.props.getOwnProfile(userId);
        if(!error) {
          localStorage.setItem('token', token);
          return this.props.setLoggedInState();
        }
        toast.error('User not found');
        this.props.history.push('/login');
      }
    } else if (!this.props.isLoggedIn) {
      this.props.history.push('/login')
    }
  }

  render() {
    return <p>This is the dashboard page placeholder</p>
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  getOwnProfile: PropTypes.func,
  setLoggedInState: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

const mapStateToProps = ({ auth: { isLoggedIn }}) => ({ isLoggedIn });
const mapDispatchToProps = (dispatch) => ({
  getOwnProfile: id => dispatch(getOwnProfile(id)),
  setLoggedInState: () => dispatch(setLoggedInState)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
