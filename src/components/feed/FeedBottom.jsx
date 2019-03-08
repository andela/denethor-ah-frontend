import React from 'react';
import FeedBottomLargeCard from './FeedBottomLargeCard';
import FeedBottomSmallCard from './FeedBottomSmallCard';
import {Link} from 'react-router-dom'

const FeedBottom = () => {
  return (
    <div className="feed-bottom-section">
      <div className="nav-container-feed-bottom">
        <div className="top-categories-header"><h3>TOP CATEGORIES</h3></div>
        <div className="nav-items">
        <ul>
          <li className="active"><Link to='/'>ALL</Link></li>
          <li><Link to='/'>LIFESTYLE</Link></li>
          <li><Link to='/'>FASHION</Link></li>
          <li><Link to='/'>HEALTH</Link></li>
          <li><Link to='/'>SCIENCE</Link></li>
        </ul>
      </div>
      </div>
      <div className="feed-bottom">
      <FeedBottomLargeCard/>
      <div className="feed-bottom-side">
        <div className="feed-container-article-block-first">
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
        </div>
        <div className="feed-container-article-block-second">
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
          <FeedBottomSmallCard/>
        </div> 
      </div>
    </div>  
    </div>  
  )
}

export default FeedBottom;