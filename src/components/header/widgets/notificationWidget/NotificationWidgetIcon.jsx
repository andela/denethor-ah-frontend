import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const NotificationWidgetIcon = ({ toggleBubble, notifications }) => (
  <div className="header__notification-widget__icon">
    <button onClick={toggleBubble}>
      <FontAwesomeIcon
        className={
          `header__notification-widget__icon__bell${notifications.some(({ read }) => !read)
            ? ' unread'
            : ''}`}
        icon={faBell}
        size="2x"
        onClick={toggleBubble}
      />
    </button>
  </div>
);

NotificationWidgetIcon.propTypes = {
  toggleBubble: PropTypes.func,
  notifications: PropTypes.array
};

const mapStateToProps = ({ profile: { imageUrl } }) => ({ imageUrl });

export default connect(mapStateToProps)(NotificationWidgetIcon);
