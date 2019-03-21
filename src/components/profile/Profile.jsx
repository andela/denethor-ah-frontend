import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundedImage from '../../components/RoundedImage';
import HorizontalMargin from '../../components/HorizontalMargin';
import { RatingStars } from '../../components/ratingStars';
import ArticleListItem from './ArticleListItem';
import './styles.scss';


export const Profile = (props) => {
  const { 
    firstname = '',
    followers,
    following,
    lastname = '',
    username = '',
    bio = '', 
    imageUrl,
    publishedArticles = [],
    userAverageRating
  } = props.profile;

  return (
    <div>
      <div className='profile__banner-section'>
        <div className='profile__banner-image'>
          <img src={'/assets/img/banner.png'} alt='banner background' />
        </div>
        <div className='profile__transparent-overlay' />
        <div className='profile__banner-content'>
          <div className='profile__auto-container'>
            <div>
              <div className='profile__banner-content-title'>
                {`${firstname} ${lastname}`}
                <div className='profile--bio'>
                  <p>{bio}</p>
                </div>
              </div>
              <div className='profile__avatar-text-group'>
                <div className='profile__user-profile-picture'>
                  <RoundedImage imageSource={imageUrl || '/assets/img/placeholder-profile-picture.png'} alt='profile picture'/>
                </div>
                <HorizontalMargin className='show-for-medium' size={10} />
                <div className='profile-username-rate-group'>
                  <div className='profile-header-username'>{username}</div>
                  <div className ='profile-rating-container'>
                    <div className='profile-header-rating'>
                      <RatingStars rateNumber={userAverageRating ? Math.round(userAverageRating.averageRating) : 0} />
                    </div>
                    <div className='profile-header-rated-times'>
                      {
                        !userAverageRating
                          ? <span className='spinner spinner--ratings'></span>
                          : userAverageRating.ratingCount < 1 || userAverageRating.totalArticlesWithRating < 1
                            ? 'No ratings yet'
                            : `rated by ${userAverageRating.ratingCount} user${userAverageRating.ratingCount > 1
                              ? 's'
                              : ''}`
                      }
                    </div>
                  </div>
                </div>
                <div>
                </div>
                </div>
                </div>
                <div className='profile__stats'>
                  <h1><span>{publishedArticles.length}</span><span> Articles</span></h1>
                  <h1><span>{followers ? followers.length : ''}</span><span> Followers</span></h1>
                  <h1><span>{following ? following.length : ''}</span><span> Following</span></h1>
                </div>
          </div>
        </div>
      </div>
      <div className='profile__article-section'>
        <h1>Your Articles</h1>
        <ul>
          {
            publishedArticles[0]
              ? publishedArticles.map(article => (<ArticleListItem key={article.id} article={article}/>))
              : <div className='profile__article-section__no-articles'>
                  <p>
                    No articles yet.
                  </p>
                </div>
          }
        </ul>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps)(Profile);
