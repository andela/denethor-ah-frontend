import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import ArticlePage from './components/ArticlePage';
import Header from './components/header';
import Footer from './components/footer';


class Main extends Component {
  state = {
    bannerScreen: 'Stats'
  };

  handleLogin = () => {
    this.setState(() => ({ bannerScreen: 'Login' }))
  };

  handleSignup = () => {
    this.setState(() => ({ bannerScreen: 'Signup' }))
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route render={(props) => <Header {...props} handleLogin={this.handleLogin} handleSignup={this.handleSignup}/>} />
          <Switch>
            <Route exact path="/" render={() => <Home handleSignup={this.handleSignup} side={this.state.bannerScreen} />} />
            <Route path="/articles/1" component={ArticlePage} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;