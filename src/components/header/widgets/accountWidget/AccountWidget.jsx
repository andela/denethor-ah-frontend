import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bubble from '../bubble';
import AccountWidgetIcon from './AccountWidgetIcon';
import AccountWidgetOptions from './AccountWidgetOptions';
import './styles.scss';


export class AccountWidget extends Component {
  state = {
    showBubble: false
  }

  componentDidMount = () => {
    this.setState({
      showBubble: false,
      pathname: this.props.history.location.pathname
    });
  }

  toggleBubble = (showBubble) => {
    if(showBubble !== undefined) {
      return this.setState({ showBubble });
    }
    this.setState(({ showBubble }) => ({ showBubble: !showBubble }));
}

  render() {
    const { toggleBubble, state: { showBubble } } = this;
    return (
      <div className="header__account-widget">
        <AccountWidgetIcon toggleBubble={toggleBubble} />
        {showBubble && <Bubble BubbleContent={AccountWidgetOptions} toggleBubble={toggleBubble}/>}
      </div>
    );
  }
}

AccountWidget.propTypes = {
  history: PropTypes.object,
}

export default withRouter(AccountWidget);
