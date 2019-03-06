import React from 'react';
import './style.scss';

const PostCard = ({ size, article }) => {
  size = size ? size : 'big';

  // const likeIcon = 

  return (
    <div className={`post-card ${size}`}>
      <div className='post-card__container' style={{ backgroundImage: `url(${article.featuredImage})` }}>
        <div className='post-card__overlay'></div>
        <div className='post-card__content'>
          <button className='post-card__category-name'>writing</button>
          <div className='post-card__article-title'>{article.title}</div>
          <div className='post-card__meta-data'>
            <div className='post-card__author-name'>{article.author.username}, </div>
            <div className='post-card__date-published'>3 Months ago</div>

            <div className=''>
              <span className='post-card__read-time'>{article.readTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;