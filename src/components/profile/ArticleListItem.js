import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArticleListItem = props => {
  const { id, title, createdAt } = props.article;
  
  return (
    <li>
      <h3><Link to={`/articles/${id}`}>{title}</Link></h3>
      <small>{`Created ${moment(createdAt).calendar()}`}</small>
    </li>
  );
}
ArticleListItem.propTypes = {
  article: PropTypes.object
}

export default ArticleListItem;
