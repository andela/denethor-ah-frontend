import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ServerPaginator from '../../paginator/ServerPaginator';
import './style.scss';

const CategoriesPage = ({ location: { search } }) => {
  const category = queryString.parse(search).category;

  return (
    <div className="feed-bottom-section">
      <ServerPaginator url={`/articles?category=${category}`} />
    </div>  
  )
};

CategoriesPage.propTypes = {
  location: PropTypes.object,
}

export default CategoriesPage;
