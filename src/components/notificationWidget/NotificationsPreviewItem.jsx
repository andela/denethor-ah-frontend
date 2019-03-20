import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { removeNotifications } from '../../redux/actions/notifications';

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


export const NotificationsPreviewItem = props => {
  const { message, articleId, time } = props.notification;
  
  return (
    <li>
      <Link to={`/articles/${articleId}`} onClick={() => props.removeNotifications(articleId)}>
        <p>{message}</p>
        <span><small>{moment(time).fromNow()}</small></span>
      </Link>
    </li>
  );
}
NotificationsPreviewItem.propTypes = {
  notification: PropTypes.object,
  removeNotifications: PropTypes.func
}

export const mapDispatchToProps = (dispatch) => ({
  removeNotifications: (articleId) => dispatch(removeNotifications(articleId))
});

export default connect(undefined, mapDispatchToProps)(NotificationsPreviewItem);
