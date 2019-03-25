import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundedImage from '../../../RoundedImage';

const AccountWidgetIcon = ({ toggleBubble, imageUrl }) => (
  <div className="header__account-widget__icon">
    <button onClick={toggleBubble}>
      <RoundedImage imageSource={imageUrl || '/assets/img/placeholder-profile-picture.png'} alt="notifications widget" />
    </button>
  </div>
);

AccountWidgetIcon.propTypes = {
  toggleBubble: PropTypes.func,
  imageUrl: PropTypes.string
};

const mapStateToProps = ({ profile: { imageUrl } }) => ({ imageUrl });

export default connect(mapStateToProps)(AccountWidgetIcon);
