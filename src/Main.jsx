import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/home';
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

  loadStats = () => {
    if(!(this.state.bannerScreen === 'Stats')) {
      this.setState(() => ({ bannerScreen: 'Stats' }));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header handleLogin={this.handleLogin} handleSignup={this.handleSignup} loadStats={this.loadStats}/>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} side={this.state.bannerScreen} handleSignup={this.handleSignup} />} />
            <Route path="/dashboard" component={() => <p>This is the dashboard page placeholder</p>} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;