import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import SearchForm from '../../../searchForm/SearchForm';
import './styles.scss';

export class SearchWidget extends Component {
  state = {
    display: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => this.setState({ display: false });

  handleDisplay = () => {
    this.setState((prevState) => ({ display: !prevState.display}));
  }

  render() {
    const { state: { display }, props, handleDisplay } = this;
    
    return (
      <div className='w-48'>
        <button className='search-button' onClick={handleDisplay}>
          {!display && (<img src='/assets/img/search-icon.svg' alt='ah-search-icon' />)}
          {display && (<FontAwesomeIcon icon={faTimes} color="#818181" size="2x" />)}
        </button>
        <div className={`search-form ${display ? 'active' : ''}`}>
          <SearchForm {...props} />
        </div>
      </div>
    )
  }
}

SearchWidget.propTypes = {
  isLoggedIn: PropTypes.bool
}

const mapStateToProps = ({ auth: { isLoggedIn = false } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(withRouter(SearchWidget));