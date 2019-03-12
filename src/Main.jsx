import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/home';
import Header from './components/header'
import Footer from './components/footer'
import ArticlePage from './components/ArticlePage';
import Redirect from './components/Redirect';

class Main extends Component {
  state = {
    bannerScreen: 'Stats'
  };

  /**
   * Tag: Route change
   * This ensure that when routes change,
   * the window is forced to load to the top
   * Without this, when routes changes, the new page or view
   * retains the scroll position from the previous page
   * @returns {null}
   */
  scrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  }

  handleLogin = () => {
    this.setState(() => ({ bannerScreen: 'Login' }))
  };

  handleSignup = () => {
    this.setState(() => ({ bannerScreen: 'Signup' }))
  };

  loadStats = () => {
    if(!(this.state.bannerScreen === 'Stats')) {
      this.setState(() => ({ bannerScreen: 'Stats' }));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route component={this.scrollToTop} /> 
          <Header handleLogin={this.handleLogin} handleSignup={this.handleSignup} />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} side={this.state.bannerScreen} handleSignup={this.handleSignup} />} />
            <Route path="/articles/:articleId" component={ArticlePage} />
            <Route path="/dashboard" component={() => <p>This is the dashboard page placeholder</p>} />
            <Route path="/api/users/:id/verify" component={Redirect} />

          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
