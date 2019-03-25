import React from 'react';
import NotificationWidget from '../notificationWidget';
import AccountWidget from '../accountWidget';
import './styles.scss';

const WidgetContainer = () => (
  <div className="header__widget-container">
    <NotificationWidget />
    <AccountWidget />
  </div>
);

export default WidgetContainer;
