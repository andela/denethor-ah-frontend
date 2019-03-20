import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Stats from './stats/Stats';
import Signup from './signup/Signup';
import Login from './login/Login';
import './styles.scss';

const sides = {
  Stats,
  Signup,
  Login
};

export const Banner = ({ bannerScreen: side, history, isLoggedIn }) => {
  const Side = sides[side];
  return (
    <div className="banner">
      <div className={"banner__slogan"}>
        <div>
          <h1 className="banner__yellow-text hidden-on-mobile">The place <br /> writers love...</h1>
          <h1><span className="banner__yellow-text-mobile">Great writers,</span><br />Quality Content</h1>
          {
            !isLoggedIn
              ? <button onClick={() => history.push('/signup')}>Get Started</button>
              : <button onClick={() => history.push('/dashboard')}>Dashboard</button>
          }
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
}

Banner.propTypes={
  bannerScreen: PropTypes.string,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

const BannerWithRouter = withRouter(Banner);

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(BannerWithRouter);
