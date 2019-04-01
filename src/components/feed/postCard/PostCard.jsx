import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import './style.scss';

const PostCard = ({ size, article, categories = [] }) => {
  size = size ? size : 'big';

  const category = categories.find(item => item.id === article.categoryId) || {};

  let { id, title, featuredImage, author = {}, dateCreated, readTime } = article;
  
  title = validator.unescape(title);

  return (
    <div className={`post-card ${size}`}>
      <div className='post-card__container' style={{ backgroundImage: `url(${featuredImage})` }}>
        <div className='post-card__overlay'></div>
        <div className='post-card__content'>
          <button className='post-card__category-name'>{category.name}</button>
          <div className='post-card__article-title'><NavLink to={`/articles/${id}`}>{title}</NavLink></div>
          <div className='post-card__meta-data'>
            <div className='post-card__author-name'>{author.username}, </div>
            <div className='post-card__date-published'>{dateCreated}</div>

            <div className=''>
              <span className='post-card__read-time'>{readTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  size: PropTypes.string,
  article: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
}

export default PostCard;