import React from 'react';
import RoundedImage from '../../components/RoundedImage';
import VerticalMargin from '../../components/VerticalMargin';
import HorizontalMargin from '../../components/HorizontalMargin';
import RatingStars from '../../components/RatingStars';
import RatingStarsBox from '../../components/RatingStarsBox';
import sampleArticle from './sampleArticle';
import HorizontalLine from '../../components/HorizontalLine';
import TextAreaInput from '../../components/TextAreaInput';
import CommentEntries from '../../components/CommentEntries';
import './style.scss';


const SingleArticleView = () => {
  let articleBodyHTML = sampleArticle.body
  let sampleComments = sampleArticle.comments || [];

  return (
    <div>
      <div className='banner-section' style={{backgroundImage: 'assets/'}}>
        <div className='banner-image'>
          <img src='/assets/img/map-typing.jpg' alt='banner background' />
        </div>
        <div className='transparent-overlay' />
        <div className='banner-content'>
          <div className='auto-container'>
            <div className='banner-content-title '>How to speak so that people want to listen every time</div>
            <div className='avatar-text-group'>
              <div className='user-profile-picture'>
                <RoundedImage imageSource={'/assets/img/princess.png'} alt='profile picture'/>
                <VerticalMargin className='hide-for-medium' size={50} />
              </div>
              <HorizontalMargin className='show-for-medium' size={10} />
              <div className='article-username-rate-group'>
                <div className='article-header-username'>Princess Einstenna</div>
                <div className='article-header-rating'>
                  <RatingStars rateNumber={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='body-section'>
        <div className='auto-container wide-padding'>
          <div className='article-body'>
            <div dangerouslySetInnerHTML={{ __html: articleBodyHTML }} />
          </div>
          <HorizontalLine />
          <div className='section-article-info'>  
            <div>Rate this Article <RatingStarsBox rateNumber={4} /></div>
            <VerticalMargin className='show-for-medium' size={10} />
            <div>
              <div className='section-comment-create'>
                <div>Leave comments</div>
                <TextAreaInput className='article-comment-field' text='I like what I see here.' />
              </div>
              <HorizontalLine />              
              <div className='section-user-comments'>
                <div>Reader Comments</div>
                <CommentEntries comments={sampleComments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleArticleView;



