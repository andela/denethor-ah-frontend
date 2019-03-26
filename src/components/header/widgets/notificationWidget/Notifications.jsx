import React from 'react';
import uuid from 'uuid/v1';
import NotificationItem from './Notification';

const Notifications = (notifications) => () => (
  <div className="header__notification-widget__preview-pane">
    <ul>
    {
      notifications[0]
        ?
          notifications.map((notification) =>
            <NotificationItem key={uuid()} notification={notification} />
          )
        : 
          <li className="header__notification-widget__preview-pane__no-notifications">
            <p>No notifications</p>
          </li>
      }
    </ul>
  </div>
);

export default Notifications;
