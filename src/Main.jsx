import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';
import Home from './components/home';
import Header from './components/header/Header';
import Footer from './components/footer';
import { ArticlePage } from './components/articles';
import Redirect from './components/redirect/Redirect';
import ResetPassword from './components/resetPassword/ResetPassword';
import { Dashboard } from './components/dashboard';
import FilteredArticles from './components/filteredArticles/FilteredArticles';
import UnsubscribeNotification from './components/notifications/UnsubscribeNotification'
import ResetPasswordVerification from './components/resetPasswordVerification/ResetPasswordVerification';
import { setLoggedInState } from './redux/actions/auth';
import { getOwnProfile, userBookmarks } from './redux/actions/profile';
import AuthHOC from './components/AuthHOC';

class Main extends Component {
  state = {
    newNotifications: 0,
    toastId: 'notification'
  }
  
  async componentDidMount() {
    if (localStorage.token) {
      const { token } = localStorage;

      let userId;

      try {
        userId = JSON.parse(window.atob(token.split('.')[1])).id;
      } catch (error) {
        this.props.setLoggedInState(false);
      }

      if (userId) {
        const error = await this.props.getOwnProfile(userId);
        if(!error) {
          await this.props.getBookmarks(userId);
          this.props.setLoggedInState(true);
          this.setState({ isLoggedIn: true });
          return;
        }
        toast.error('User not found');
        localStorage.clear();
      }
    } else {
      this.props.setLoggedInState(false);
    }
  }

  async shouldComponentUpdate() {
    if (this.state.isLoggedIn === undefined) {
      return false
    }
    const { isLoggedIn } = this.props;
    if(!this.state.isLoggedIn && isLoggedIn === true) {
      const { token } = localStorage;
      const userId = JSON.parse(window.atob(token.split('.')[1])).id;
      const error = await this.props.getOwnProfile(userId);
      if(!error) {
        this.setState({ isLoggedIn: true });
        this.props.getBookmarks(userId);
        this.props.setLoggedInState(true);
      }
    } else if (this.state.isLoggedIn && isLoggedIn === false) {
      this.setState({ isLoggedIn: false });
    } 
  }

  scrollToTop = () => {
    return null;
  };

  render() {
    return (
      <BrowserRouter>
        <div>
        <ToastContainer />
          <Route component={this.scrollToTop} />
          <Header />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} bannerScreen={'Stats'} />} />
            <Route path="/articles/:articleId" component={ArticlePage} />
            <Route exact path="/login" render={(props) => <Home {...props} bannerScreen={'Login'} />} />
            <Route exact path="/signup" render={(props) => <Home {...props} bannerScreen={'Signup'} />} />
            <Route path="/dashboard" component={AuthHOC(Dashboard)} />
            <Route path='/filter' component={FilteredArticles} />
            <Route path="/api/users/:id/verify" component={Redirect} />
            <Route exact path="/passwordreset" component={ResetPassword} />
            <Route path="/api/users/:id/unsubscribe" component={UnsubscribeNotification} />
            <Route path="/passwordreset/verify" component={ResetPasswordVerification} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

Main.propTypes = {
  getOwnProfile: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  setLoggedInState: PropTypes.func,
  getBookmarks: PropTypes.func,
  notifications: PropTypes.array,
  removeNotifications: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  getOwnProfile: id => dispatch(getOwnProfile(id)),
  setLoggedInState: loggedInState => dispatch(setLoggedInState(loggedInState)),
  getBookmarks: id => dispatch(userBookmarks(id))
});

const mapStateToProps = ({ auth: { isLoggedIn }, notifications }) => ({ isLoggedIn, notifications });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
