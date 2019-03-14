import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import { ArticlePage } from './components/articles';
import Redirect from './components/redirect/Redirect';
import ResetPassword from './components/resetPassword/ResetPassword';
import { Dashboard } from './components/dashboard';


const Main = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Route component={scrollToTop} />
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} bannerScreen={'Stats'} />} />
          <Route path="/articles/:articleId" component={ArticlePage} />
          <Route exact path="/login" render={(props) => <Home {...props} bannerScreen={'Login'} />} />
          <Route exact path="/signup" render={(props) => <Home {...props} bannerScreen={'Signup'} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/api/users/:id/verify" component={Redirect} />
          <Route path="/passwordreset" component={ResetPassword} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Main;
