import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { monthDifference } from '../../utils/monthsDifference';
import { extractImageFromBody } from '../../utils/imageExtractor';
import PropTypes from 'prop-types';
import './styles.scss';

library.add(faClock);

const FeedBottomSmallCard = ({
  title,
  body,
  createdAt,
  author,
  readTime
}) => {

  const articleImage = extractImageFromBody(body);
  return (
    <div className="feed-bottom-container-small">   
        <img src = {articleImage} alt="feed" className="feed-bottom-container__small_image"/> 
        <div className="feed-bottom-container__small_image_info-container">
            <h3 className="feed-bottom-container__small_image__info-header">{title}</h3>
            <p className="feed-bottom-container__small_image__info-published-date">{`${author.username} ${monthDifference(createdAt)} months ago`}</p>
            <p className="feed-bottom-container__small_image__info-minutes-read">
              <FontAwesomeIcon icon="clock" color="#818181" size="1x"/>    
              {` ${readTime}`}
            </p>
          </div>
    </div>
  )
}

FeedBottomSmallCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.object,
  readTime: PropTypes.string
}

export default FeedBottomSmallCard;