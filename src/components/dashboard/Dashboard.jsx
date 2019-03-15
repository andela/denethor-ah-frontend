import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SideBar } from './side-bar';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ContentArea } from './content-area';
import { Switch, Route } from 'react-router-dom';
import { setLoggedInState } from '../../redux/actions/auth';
import { getOwnProfile } from '../../redux/actions/profile';
import { TopReads } from '../articles/top-reads';
import Profile from '../profile/Profile';
import EditProfile from '../profile/editProfile/EditProfile';
import UserBookmarks  from '../userBookmarks/userBookmarks';
import './style.scss';

export class Dashboard extends Component {
  async componentDidMount() {
    const isSocialLogin = document.location.hash.includes('token');
    if ( isSocialLogin || localStorage.token) {
      const token = isSocialLogin ? document.location.hash.slice(7) : localStorage.token;
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
        localStorage.clear();
        this.props.history.push('/login');
      }
    } else if (!this.props.isLoggedIn) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className={`dashboard-page-wrapper`}>
        <SideBar />
        <ContentArea>
          <Switch>
            <Route path='/dashboard/top-reads' component={TopReads} />
            <Route path='/dashboard/my-profile' component={Profile} />
            <Route path='/dashboard/edit-profile' component={EditProfile} />
            <Route path='/dashboard/bookmarked-articles' component={UserBookmarks} />
          </Switch>
        </ContentArea>
      </div>
    );
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
