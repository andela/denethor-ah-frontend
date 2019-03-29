import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import validator from 'validator';

library.add(faClock);

const FeedBottomLargeCard = ({
  id,
  title,
  description,
  dateCreated,
  author = {},
  featuredImage,
  readTime
}) => {
  title = validator.unescape(title);
  return (
    <div className="feed-bottom-large-card-container">   
        <div className="feed-bottom-large-card-container-image">
          <img alt="feed" src={ featuredImage } />
          <div className='feed-bottom-large-card-container-overlay' />
        </div>
        <div>
          <div className="feed-bottom-container__large_image_info-container">
            <h3 className="feed-bottom-container__large_image__info-header"><NavLink to={`/articles/${id}`}>{title}</NavLink></h3>
            <p className="feed-bottom-container__large_image__info-published-date">{author.username}</p>
            <p className="feed-bottom-container__large_image__info-minutes-read">
              {dateCreated} &nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon="clock" color="#818181" size="1x"/>    
              {`  ${readTime} `}
            </p>
          </div>
        </div> 
        <div className="feed-bottom-container__article-description">
          {description}
          </div>    
    </div>
  )
}

FeedBottomLargeCard.propTypes = {
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

export default FeedBottomLargeCard;