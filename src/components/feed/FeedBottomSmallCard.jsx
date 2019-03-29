import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';
import validator from 'validator';

library.add(faClock);

const FeedBottomSmallCard = ({
  id,
  title,
  dateCreated,
  author = {},
  readTime,
  featuredImage
}) => {
  title = validator.unescape(title);
  
  return (
    <div className="feed-bottom-container-small">
      <img src = {featuredImage} alt="feed" className="feed-bottom-container__small_image"/> 
      <div className="feed-bottom-container__small_image_info-container">
        <h3 className="feed-bottom-container__small_image__info-header"><NavLink to={`/articles/${id}`}>{title}</NavLink></h3>
        <p className="feed-bottom-container__small_image__info-published-date">{author.username}</p>
        <p className="feed-bottom-container__small_image__info-minutes-read">
          {dateCreated} &nbsp;&nbsp;&nbsp;
          {readTime && <FontAwesomeIcon icon="clock" color="#818181" size="1x"/>}
          {readTime && ` ${readTime}`}
        </p>
      </div>
    </div>
  )
}

FeedBottomSmallCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  dateCreated: PropTypes.string,
  featuredImage: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.object,
  readTime: PropTypes.string
}

export default FeedBottomSmallCard;