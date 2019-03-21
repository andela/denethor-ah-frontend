import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SideBar } from './sideBar';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ContentArea } from './contentArea';
import DashboardHome from './DashboardHome';
import { Switch, Route } from 'react-router-dom';
import { setLoggedInState } from '../../redux/actions/auth';
import { getOwnProfile } from '../../redux/actions/profile';
import { getArticles } from '../../redux/actions/articles';
import { TopReads } from '../articles/topReads';
import Profile from '../profile/Profile';
import EditProfile from '../profile/editProfile/EditProfile';
import './style.scss';

export class Dashboard extends Component {
  async componentDidMount() {
    this.props.getArticles();

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
            <Route exact path='/dashboard' render={() => <DashboardHome /> }/>
            <Route path='/dashboard/topReads' component={TopReads} />
            <Route path='/dashboard/my-profile' component={Profile} />
            <Route path='/dashboard/edit-profile' component={EditProfile} />
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

const mapStateToProps = ({ auth: { isLoggedIn }, profile }) => ({ 
  isLoggedIn,
  profile
});
const mapDispatchToProps = (dispatch) => ({
  getOwnProfile: id => dispatch(getOwnProfile(id)),
  getArticles: () => dispatch(getArticles()),
  setLoggedInState: () => dispatch(setLoggedInState)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
