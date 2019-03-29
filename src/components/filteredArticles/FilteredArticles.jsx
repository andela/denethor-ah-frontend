import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import Paginator from '../paginator/Paginator';
import './styles.scss';

const FilteredArticles = ({ articles }) => (
  <div className='flex filter-form'>
    {!articles.length && (
      <div className='flex search-error'>
        <FontAwesomeIcon 
          icon={faTimesCircle} 
          size='3x'
          color='#ff0000'
        />
        &nbsp;&nbsp;&nbsp;
        <h2>No Article was found</h2>
      </div>
    )}
    {!!articles.length && (<h2>Search Result</h2>)}
    <Paginator items={articles} />
  </div>
)

FilteredArticles.propTypes={
  articles: PropTypes.array
}

const mapStateToProps = ({ filters }) => ({ articles: filters });

export default connect(mapStateToProps)(FilteredArticles);
