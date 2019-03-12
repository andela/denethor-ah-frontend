import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router-dom';
import Stats from './Stats/Stats';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './styles.scss';
import "react-toastify/dist/ReactToastify.css";

const sides = {
  Stats, Signup, Login
};

export const Banner = ({ bannerScreen: side, history }) => {
  const Side = sides[side];
  return (
    <div className="banner">
      <div className={"banner__slogan"}>
        <div>
          <h1 className="banner__yellow-text hidden-on-mobile">The place <br /> writers love...</h1>
          <h1><span className="banner__yellow-text-mobile">Great writers,</span><br />Quality Content</h1>
          <button onClick={() => history.push('/signup')}>Get Started</button>
        </div>
      </div>
      <div className={`banner__screen banner__screen--${side.toLowerCase()}`}>
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionAppear={true}
          transitionAppearTimeout={800}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={400}
        >
          <Side key={side}/>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};

export default withRouter(Banner);
