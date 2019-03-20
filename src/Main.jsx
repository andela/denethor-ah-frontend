import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
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
import { setLoggedInState } from './redux/actions/auth';
import { getOwnProfile } from './redux/actions/profile';
import AuthHOC from './components/AuthHOC';
import UnsubscribeNotification from './components/notifications/UnsubscribeNotification'
import ResetPasswordVerification from './components/resetPasswordVerification/ResetPasswordVerification';

class Main extends Component {
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
          return this.props.setLoggedInState(true);
        }
        toast.error('User not found');
        localStorage.clear();
      }
    }
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
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
            <Route path="/passwordreset" component={ResetPassword} />
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
  setLoggedInState: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  getOwnProfile: id => dispatch(getOwnProfile(id)),
  setLoggedInState: loggedInState => dispatch(setLoggedInState(loggedInState))
});

export default connect(undefined, mapDispatchToProps)(Main);
