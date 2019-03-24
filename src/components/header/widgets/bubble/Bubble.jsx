import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Bubble extends Component {
  componentDidMount () {
    document.addEventListener('click', this.handleToggle);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleToggle);
  }

  handleToggle = ({ target }) => {
    if (this.bubble.contains(target)) return;

    this.props.toggleBubble(false);
  };



  render() {
    const { BubbleContent } = this.props;
    return (
      <div className="header__widget__bubble__wrapper">
        <div className="header__widget__bubble__content" ref={node => this.bubble = node}>
          <BubbleContent />
        </div>
      </div>
    );
  }
}

Bubble.propTypes = {
  BubbleContent: PropTypes.func,
  toggleBubble: PropTypes.func
};

export default Bubble;
