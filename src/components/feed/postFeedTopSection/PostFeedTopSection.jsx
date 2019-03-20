import React from "react";
import { PostCard } from '../postCard';
import PropTypes from 'prop-types';
import './style.scss';

const PostStreamTopSection = ({ articles, categories }) => {
  const sectionArticles = [];
  articles.forEach((item, index) => {
    // stop loading articles after the 4th item
    if(index > 3) return;

    const indexToSizeMap = {
      0: 'big',
      1: 'small first',
      2: 'small second',
      3: 'wide',
    };

    const size = indexToSizeMap[index];

    const postEntry = <PostCard key={item.id} categories={categories} article={item} size={size} />;

    sectionArticles.push(postEntry);
  });

  return (
    <div className='auto-container'>
      <div className='section-title'>Latest Publications</div>
      <div className='post-stream-top'>
        {sectionArticles}
      </div>
    </div>
  )
}

PostStreamTopSection.propTypes = {
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
}

export default PostStreamTopSection;