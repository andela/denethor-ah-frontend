import React from 'react';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

library.add(faClock);

const FeedBottomLargeCard = () => {
  const headerText = "Why the human mind is so powerful";
  const userName = "John Doe ";
  const datePublished = new Date().getMonth();
  const timeToRead = " 5 ";
  const articleDescription = "Lorem ipsium blah blah blah Lorem ipsium blah blah blahLorem ipsium blah blah blah Lorem ipsium blah blah blah Lorem ipsium blah blah blah Lorem ipsium blah blah blah"
  return (
    <div className="feed-bottom-large-card-container">   
        <div className="feed-bottom-large-card-container-image">
          <div className="feed-bottom-container__large_image_info-container">
            <h3 className="feed-bottom-container__large_image__info-header">{headerText}</h3>
            <p className="feed-bottom-container__large_image__info-published-date">{userName + datePublished + " months ago"}</p>
            <p className="feed-bottom-container__large_image__info-minutes-read">
              <FontAwesomeIcon icon="clock" color="#818181" size="1x"/>    
              {timeToRead +" mins"}
            </p>
          </div>
        </div> 
        <div className="feed-bottom-container__article-description">
          {articleDescription}
          </div>    
    </div>
  )
}

export default FeedBottomLargeCard;