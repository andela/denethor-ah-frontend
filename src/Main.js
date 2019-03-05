import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../src/components/home';
import Header from '../src/components/header'

const Main = () => (
  <div>
    <Header/>
    <Route exact path="/" component={Home} />
  </div>
);

export default Main;