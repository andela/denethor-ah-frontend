import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Bubble from '../bubble';
import NotificationWidgetIcon from './NotificationWidgetIcon';
import Notifications from './Notifications';
import removeNotifications from '../../../../redux/actions/notifications';
import './styles.scss';


export class NotificationWidget extends Component {
  state = {
    showBubble: false,
    newNotifications: 0,
    toastId: 'notification'
  }

  componentDidMount () {
    const {
      props: { notifications = [], removeNotifications },
      state: { toastId }
    } = this;
  
    const newNotification = notifications.find(({ read }) => !read);
    const newNotificationsInProps = notifications.reduce((count, { read }) => count + (read ? 0 : 1), 0);

    if(newNotification) {
      const { message, articleId } = newNotification;

      if (!toast.isActive(toastId)) {
        const Notification = ({ closeToast }) => (
          <Link
          to={`/articles/${articleId}`}
          onClick={() => {
            removeNotifications(articleId);
            closeToast()
          }}>
            {message}
          </Link>
        );

        toast(<Notification />, {
          toastId,
          autoClose: 10000,
          hideProgressBar: true,
          className: 'notification-widget__toast',
          closeOnClick: false
        });
      }
      const newNotifications = newNotificationsInProps;

      this.setState({ newNotifications });
    }
  }

  componentDidUpdate () {
    const {
      props: { notifications = [], removeNotifications },
      state: { newNotifications: newNotificationsInState, toastId }
    } = this;

    const newNotificationsInProps = notifications.reduce((count, { read }) => count + (read ? 0 : 1), 0);

    if(newNotificationsInProps > newNotificationsInState) {
      const { message, articleId } = notifications.find(({ read }) => !read);

      if (!toast.isActive(toastId)) {
        const Notification = ({ closeToast }) => (
          <Link
          to={`/articles/${articleId}`}
          onClick={() => {
            removeNotifications(articleId);
            closeToast()
          }}>
            {message}
          </Link>
        );

        toast(<Notification />, {
          toastId,
          autoClose: 10000,
          hideProgressBar: true,
          className: 'notification-widget__toast',
          closeOnClick: false
        });
      }
      const newNotifications = newNotificationsInProps;

      this.setState({ newNotifications });
    }
  }

  toggleBubble = (showBubble) => {
    if(showBubble !== undefined) {
      return this.setState({ showBubble });
    }
    this.setState(({ showBubble }) => ({ showBubble: !showBubble }));
  }

  render() {
    const {
      toggleBubble,
      props: { notifications = [] },
      state: { showBubble }
    } = this;

    return (
      <div className="header__notification-widget">
        <NotificationWidgetIcon notifications={notifications} toggleBubble={toggleBubble} />
        {showBubble && <Bubble BubbleContent={Notifications(notifications)} toggleBubble={toggleBubble}/>}
      </div>
    );
  }
}

NotificationWidget.propTypes = {
  history: PropTypes.object,
  notifications: PropTypes.array,
  removeNotifications: PropTypes.func
}

const mapStateToProps = ({ notifications }) => ({ notifications });

const mapDispatchToProps = (dispatch) => ({
  removeNotifications: (articleId) => dispatch(removeNotifications(articleId)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationWidget)));
