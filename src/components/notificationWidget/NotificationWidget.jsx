import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import NotificationsPreviewItem from './NotificationsPreviewItem';
import RoundedImage from '../RoundedImage';
import './styles.scss';


export class NotificationWidget extends Component {
  state = {
    showPreview: false,
    showBadge: false,
  }

  componentDidMount = () => {
    this.setState({
      showPreview: false,
      pathname: this.props.history.location.pathname
    });
  }

  componentDidUpdate = () => {
    const {
      props: { notifications, history: { location: { pathname } } },
      state: { pathname: statePathname, showPreview }
    } = this;
    if(notifications[0] && !this.state.showBadge) {
      this.setState({ showBadge: true });
    } else if (!notifications[0] && this.state.showBadge) {
      this.setState({ showBadge: false });
    }

    if((pathname !== statePathname) && showPreview) {
      this.setState({
        showPreview: false,
        pathname
      });
    }
  }

  handleToggle = () => {
    const {
      props: { history: { location: { pathname } } },
      state: { pathname: statePathname }
    } = this;

    const widget = document.querySelector('.notifications-widget__preview-pane--wrapper');

    if(pathname !== statePathname) {
      this.setState({ pathname });
    }

    this.setState({ showPreview: true });

    window.onclick = (event) => {
      if (event.target == widget) {
        this.setState({ showPreview: false });
      }
    }
}

  render() {
    const { imageUrl, notifications, id, handleLogout } = this.props;
    return (
      <div
        className="notifications-widget"
      >
        <button
          className="notifications-widget__rounded-image"
          onClick={this.handleToggle}
        >
          <div className={this.state.showBadge ? 'notifications-widget__rounded-image__badge' : 'hidden'}></div>
          <RoundedImage imageSource={imageUrl || '/assets/img/placeholder-profile-picture.png'} alt="notifications widget" />
        </button>
        <div className={
          `notifications-widget__preview-pane--wrapper${ this.state.showPreview ? '' : ' hidden'}`
        }>
          <div className={
            `notifications-widget__preview-pane${ this.state.showPreview ? '' : ' hidden'}`
          }>
            <ul>
            {
              notifications[0]
                ?
                  notifications.map((notification) =>
                    <NotificationsPreviewItem key={uuid()} notification={notification} ownerId={id} />
                  )
                : 
                  <li className="notifications-widget__preview-pane--no-notifications">
                    <p>No notifications</p>
                  </li>
              }
              <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

NotificationWidget.propTypes = {
  id: PropTypes.string,
  handleLogout: PropTypes.func,
  history: PropTypes.object,
  imageUrl: PropTypes.string,
  notifications: PropTypes.array,
  getNotifications: PropTypes.func
}

const mapStateToProps = ({ profile: { id, imageUrl }, notifications }) => ({ id, imageUrl, notifications });

export default withRouter(connect(mapStateToProps)(NotificationWidget));
