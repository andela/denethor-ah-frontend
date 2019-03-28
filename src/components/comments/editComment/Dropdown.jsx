import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Dropdown extends Component {
  componentDidMount () {
    document.addEventListener('click', this.handleToggle);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleToggle);
  }

  handleToggle = () => {
    this.props.toggleModal();
  };

  render() {
    const { isAuthor, toggleMode, showHistory, hasHistory } = this.props;

    return (
      <div className='comment__edit-comment__drop-down' ref={node => this.modal = node}>
        <ul>
          {isAuthor && <li><button onClick={() => { toggleMode('edit') }}>Edit</button></li>}
          {
            hasHistory
              && (
                <li>
                  <button onClick={() => showHistory(true)}>
                    View History
                  </button>
                </li>
              )
          }
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  isAuthor: PropTypes.bool,
  toggleModal: PropTypes.func,
  toggleMode: PropTypes.func,
  showHistory: PropTypes.func,
  hasHistory: PropTypes.object
}

export default Dropdown;
