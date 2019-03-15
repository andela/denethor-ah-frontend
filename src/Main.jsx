import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Home from './components/home';
import Header from './components/header'
import Footer from './components/footer'
import ArticlePage from './components/article-page';
import Redirect from './components/redirect/Redirect';

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
          <Route path="/dashboard" component={() => <p>This is the dashboard page placeholder</p>} />
          <Route path="/api/users/:id/verify" component={Redirect} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Main;
