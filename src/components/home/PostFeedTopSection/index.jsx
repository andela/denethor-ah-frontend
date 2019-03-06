import React from "react";
import PostCard from '../PostCard';
import sampleArticles from './sampleArticle';
import './style.scss';

const PostStreamTopSection = () => {
  const sectionArticles = [];
  sampleArticles.forEach((item, index) => {
    // stop loading articles after the 4th item
    if(index > 3) return;

    const indexToSizeMap = {
      0: 'big',
      1: 'small first',
      2: 'small second',
      3: 'wide',
    };

    const size = indexToSizeMap[index];

    const postEntry = <PostCard key={item.id} article={item} size={size} />;

    sectionArticles.push(postEntry);
  });

  return (
    <div className='auto-container'>
      <div className='post-stream-top'>
        {sectionArticles}
      </div>
    </div>
  )
}

export default PostStreamTopSection;