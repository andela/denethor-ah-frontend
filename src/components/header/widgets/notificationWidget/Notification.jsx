import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { removeNotifications } from '../../../../redux/actions/notifications';

moment.updateLocale('en', {
  relativeTime : {
      future: "in %s",
      past:   "%s",
      s  : '%ds',
      ss : '%ds',
      m:  "%dm",
      mm: "%dm",
      h:  "%dh",
      hh: "%dh",
      d:  "%dd",
      dd: "%dd",
      M:  "a month",
      MM: "%d months",
      y:  "a year",
      yy: "%d years"
  }
});


export const Notification = props => {
  const { message, articleId, time, read } = props.notification;
  
  return (
    <li>
      <Link to={`/articles/${articleId}`} onClick={() => props.removeNotifications(articleId)}>
        <p className={read ? '' : 'unread'}>{message}</p>
        <span><small>{moment(time).fromNow()}</small></span>
      </Link>
    </li>
  );
}

Notification.propTypes = {
  notification: PropTypes.object,
  removeNotifications: PropTypes.func
}

export const mapDispatchToProps = (dispatch) => ({
  removeNotifications: (articleId) => dispatch(removeNotifications(articleId))
});

export default connect(undefined, mapDispatchToProps)(Notification);
