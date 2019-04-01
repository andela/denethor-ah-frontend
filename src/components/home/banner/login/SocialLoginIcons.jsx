import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';

const backend = process.env.API_ROOT_URL;

const SocialLoginIcons = (props) => {
  const { quickAuthAction, switchQuickAuthAction, location: { pathname } } = props;
  let { currentAction } = quickAuthAction;
  const nextActionLookup = {
    'login': 'signup',
    'signup': 'login'
  };

  let nextAction = nextActionLookup[currentAction];
  let otherButton;
  /**
   * We use the quickAuthAction.active to flag that this auth modal is activated
   * when a user want to quickly get authenticated to that can carry out an action
   * requiring authorization
   * The else block caters for a normal click through
   * to /login or /signup
   */
  if (quickAuthAction.active) {
    otherButton = <button onClick={() => switchQuickAuthAction(nextAction)}>{nextAction}</button>;
  } else {
    currentAction = pathname.slice(1);
    nextAction = nextActionLookup[currentAction];
    otherButton = <NavLink to={`/${nextAction}`}>{nextAction}</NavLink>;
  }

  return (
    <div className='social-login-block-mobile'>
      <div className='social-login-block-mobile__caption'>
        <p><span>Social {nextAction}</span> or <b className='font-gold'>{otherButton}</b></p>
      </div>
      <div className='social-login-block-mobile__buttons'>
        <button><a href={`${backend}/users/google`}><FontAwesomeIcon icon={faGoogle} color='#fd2c27' /></a></button>
        <button><a href={`${backend}/users/google`}><FontAwesomeIcon icon={faFacebookF} color='#4267b2' /></a></button>
        <button><a href={`${backend}/users/google`}><FontAwesomeIcon icon={faTwitter} color='#1da1f2' /></a></button>
      </div>
    </div>
  );
}

SocialLoginIcons.propTypes = {
  quickAuthAction: PropTypes.object,
  switchQuickAuthAction: PropTypes.func,
  location: PropTypes.object
}

export default withRouter(SocialLoginIcons);