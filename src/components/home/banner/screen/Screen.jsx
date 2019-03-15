import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import Stats from '../stats/Stats';
import Signup from '../signup/Signup';
import Login from '../login/Login';

const sides = {
  Stats,
  Signup,
  Login
};

const Screen = ({ content, modal }) => {
  const Side = sides[content];
  return (
    <div className={`banner__screen banner__screen--${content.toLowerCase()}`}>
      <ReactCSSTransitionGroup
        transitionName="background"
        transitionAppear={!modal}
        transitionAppearTimeout={800}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={400}
      >
        <Side key={content}/>
      </ReactCSSTransitionGroup>
    </div>
  )
};

Screen.propTypes={
  content: PropTypes.string,
  modal: PropTypes.bool
}



export default Screen;
