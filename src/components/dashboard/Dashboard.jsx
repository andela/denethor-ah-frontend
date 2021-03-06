import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import { SideBar } from './sideBar';
import { setLoggedInState } from '../../redux/actions/auth';
import { ContentArea } from './contentArea';
import { getOwnProfile } from '../../redux/actions/profile';
import { getArticles } from '../../redux/actions/articles';
import { TopReads } from '../articles/topReads';
import Profile from '../profile/Profile';
import EditProfile from '../profile/editProfile/EditProfile';
import UserBookmarks  from '../userBookmarks/userBookmarks';
import ResetPassword from '../resetPassword';
import UserPublications from '../articles/UserPublications';
import './style.scss';

export class Dashboard extends Component {
  async componentDidMount() {
    this.props.getArticles();

    const isSocialLogin = document.location.hash.includes('token');
    if ( isSocialLogin ) {
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
        if (!error) {
          localStorage.setItem('token', token);
          return this.props.setLoggedInState(true);
        }
        toast.error('User not found');
        localStorage.clear();
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return (
      <div className={`dashboard-page-wrapper`}>
        <SideBar history={this.props.history}/>
        <ContentArea>
          <Switch>
            <Route exact path='/dashboard' render={({ history }) => { history.replace('/dashboard/my-publications'); return null; } } />
            <Route path='/dashboard/topReads' component={TopReads} />
            <Route path='/dashboard/my-profile' component={Profile} />
            <Route path='/dashboard/edit-profile' component={EditProfile} />
            <Route path='/dashboard/bookmarked-articles' component={UserBookmarks} />
            <Route path='/dashboard/reset-password' component={ResetPassword} />
            <Route path='/dashboard/bookmarked-articles' component={UserBookmarks} />
            <Route path='/dashboard/my-publications' component={UserPublications} />
          </Switch>
        </ContentArea>
      </div>
    );
  }
}
Dashboard.propTypes = {
  dispatch: PropTypes.func,
  getOwnProfile: PropTypes.func,
  getArticles: PropTypes.func,
  setLoggedInState: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

function mapStateToProps ({ auth: { isLoggedIn }, profile }) { 
  return {
    isLoggedIn,
    profile,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getOwnProfile: id => dispatch(getOwnProfile(id)),
    getArticles: () => dispatch(getArticles()),
    setLoggedInState: () => dispatch(setLoggedInState)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
