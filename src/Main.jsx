import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';
import Home from './components/home';
import Header from './components/header'
import Footer from './components/footer'

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
          <Header handleLogin={this.handleLogin} handleSignup={this.handleSignup} />
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} side={this.state.bannerScreen} handleSignup={this.handleSignup} />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;