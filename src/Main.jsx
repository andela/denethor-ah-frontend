import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';
import Home from '../src/components/home';
import Header from '../src/components/header'
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
            <Route exact path="/" render={(props) => <Home {...props} handleSignup={this.handleSignup} side={this.state.bannerScreen} />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;