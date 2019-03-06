import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Stats from './Stats/Stats';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './styles.scss';

const sides = {
  Stats, Signup, Login
};

const Banner = ({ side, handleSignup }) => {
  const Side = sides[side];
  return (
    <div className="banner">
      <div className="banner__slogan">
        <div>
          <h1 className="banner__yellow-text hidden-on-mobile">The place <br /> writers love...</h1>
          <h1><span className="banner__yellow-text-mobile">Great writers,</span><br />Quality Content</h1>
          <button onClick={handleSignup}>Get Started</button>
        </div>
      </div>
      <div className="banner__screen">
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={400}
        >
          <Side key={side}/>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};

export default Banner;
