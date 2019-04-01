import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar-edit';
import { toast } from 'react-toastify';
import { RatingStars } from "../ratingStars";
import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';
import RoundedImage from '../RoundedImage';
import { uploadProfilePicture } from '../../redux/actions/profile';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';
import './styles.scss';




export class Profile extends Component {
  state = {
    preview: null,
    src: null
  }

  componentDidMount () {
    const { imageUrl } = this.props.profile;
    if (this.props.profile.imageUrl && !this.state.preview) {
      this.setState({ preview: imageUrl })
    }
  }

  componentDidUpdate () {
    const { imageUrl } = this.props.profile;
    if (this.props.profile.imageUrl && !this.state.preview) {
      this.setState({ preview: imageUrl })
    }
  }

  onClose = async () => {
    const error = await this.props.uploadProfilePicture(this.props.profile.id, this.state.preview);
    if (error) {
      return toast.error(error);
    }
    toast.success('Profile updated');
  }
  
  onCrop = (preview) => {
    this.setState({preview})
  }

  render () {
    const { 
      firstname = '',
      followers,
      following,
      lastname = '',
      username = '',
      bio = '',
      publishedArticles = [],
      ratingInfo
    } = this.props.profile;

    const articles = publishedArticles.map(article => {
      article.featuredImage = extractImageFromBody(article.body);
      article.dateCreated =  toTimeFromNow(article.createdAt);
      // article.readTime = '1 minute';
      return article;
    });

    const { sideBarActive } = this.props;
    const articlesExist = articles.length ? true : false;
  
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
                    <div>
                      <Avatar
                        width={360}
                        height={280}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                        src={this.state.src}
                        borderStyle={{
                          border: 'none'
                        }}
                        label=''
                        labelStyle={{
                          background: 'url(/assets/img/camera-icon.png)',
                          bottom: '45%',
                          display: 'block',
                          height: '48px',
                          left: '55%',
                          cursor: 'pointer',
                          position: 'absolute',
                          width: '48px',
                          zIndex: '45',
                          opacity: sideBarActive ? '0' : '1'
                        }}
                      />
                      <div className='profile-username-rate-group'>
                        <div className='profile-header-username'>{username}</div>
                        <div className ='profile-rating-container'>
                          <div className='profile-header-rating'>
                            <RatingStars rateNumber={ratingInfo ? ratingInfo.averageRating : 0} />
                          </div>
                          <div className='profile-header-rated-times'>
                            {
                              !ratingInfo
                                ? <span className='spinner spinner--ratings'></span>
                                : ratingInfo.ratingCount < 1 || ratingInfo.totalArticlesWithRating < 1
                                  ? 'No ratings yet'
                                  : `rated by ${ratingInfo.ratingCount} user${ratingInfo.ratingCount > 1
                                    ? 's'
                                    : ''}`
                            }
                          </div>
                        </div>
                      </div>
                      <div>
                      </div>
                      </div>
                      <RoundedImage imageSource={this.state.preview || '/assets/img/placeholder-profile-picture.png'} alt='profile picture'/>
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
          <div className='flex filter-form'>
            {articlesExist && (<h2 className='list-section-header'>Published Articles</h2>)}
            {
              publishedArticles[0]
                ? articles.map((article) => (<FeedBottomSmallCard key={article.id} {...article} />))
                : <div className='profile__article-section__no-articles'>
                    <p>
                      No articles yet.
                    </p>
                  </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  history: PropTypes.object,
  uploadProfilePicture: PropTypes.func,
  sideBarActive: PropTypes.bool
};

const mapStateToProps = ({ profile, elementStatuses: { sideBarActive } }) => (
  { profile, sideBarActive }
);

const mapDispatchToProps = (dispatch) => ({
  uploadProfilePicture: (id, newProfilePicture) => dispatch(uploadProfilePicture(id, newProfilePicture))
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);