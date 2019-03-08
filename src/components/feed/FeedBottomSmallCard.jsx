import React from 'react';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

library.add(faClock);

const FeedBottomSmallCard = () => {
  const headerText = "Mastering the art of building human relationships";
  const userName = "John Doe ";
  const datePublished = new Date().getMonth();
  const timeToRead = " 5 ";
  return (
    <div className="feed-bottom-container-small">   
        <div className="feed-bottom-container__small_image"></div>
        <div className="feed-bottom-container__small_image_info-container">
            <h3 className="feed-bottom-container__small_image__info-header">{headerText}</h3>
            <p className="feed-bottom-container__small_image__info-published-date">{userName + datePublished + " months ago"}</p>
            <p className="feed-bottom-container__small_image__info-minutes-read">
              <FontAwesomeIcon icon="clock" color="#818181" size="1x"/>    
              {timeToRead +" mins"}
            </p>
          </div>
    </div>
  )
}

export default FeedBottomSmallCard;