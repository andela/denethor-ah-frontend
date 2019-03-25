import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import RoundedImage from '../RoundedImage';
import VerticalMargin from '../VerticalMargin';
import HorizontalMargin from '../HorizontalMargin';
import AuthModal from '../authModal';
import { RatingStars, RatingStarsBox } from '../ratingStars';
import { HorizontalLine } from '../horizontalLine';
import { CreateComment, CommentEntries } from '../comments';
import { addComment, getArticleComments } from '../../redux/actions/comments';
import { 
  getOneArticle, 
  rateArticle, 
  getArticleAvgRating,
  likeArticle, 
  dislikeArticle, 
  bookmarkArticle,
  getArticleDislikes,
  getArticleLikes,
  removeArticleBookmark,
  getUserBookmarks,
} from '../../redux/actions/articles';
import { LikeNumberGroup , DisLikeNumberGroup, CommentButtonGroup } from '../likeNumberGroup';
import { BookMarkHeartIcon } from '../impressionIcons'

import './style.scss';


export class SingleArticleView extends Component {
  state = {
    likeBtnColor: '#822E2E',
    BookMarkBtnColor: '#ffffff',
    currentUserRating: 0,
    showModal: false
  }


  componentDidMount () {
    const { fetchArticle, getArticleAvgRating, getArticleLikes, getArticleDislikes, match,  currentUserId, getUserBookmarks } = this.props;
    let articleId = match.params.articleId;
    
    fetchArticle(articleId);
    getArticleLikes(articleId);
    getArticleDislikes(articleId);
    getArticleAvgRating(articleId);

    if (currentUserId && !this.state.currentUserId) {
      getUserBookmarks(currentUserId);
      this.setState({ currentUserId });
    }

  }

  toggleModalOff = () => {
    this.setState({ showModal: false });
  }

  starClickHandle = (item) => {
    let articleId = this.props.match.params.articleId;
    return this.props.rateArticle(item, articleId )
    .then(() => {
      this.setState({currentUserRating: item})
      toast.success('Thank you for rating this article')}
      ) 
    .catch(error => {
      if (error.response.data.message === 'You already rated this article'){
        return toast.error('You have already rated this article');
      } else if(error.response.data === 'Unauthorized'){
         toast.error('You need to login to rate an article');
        return  this.setState({ showModal: true });
      }else if (error.response.data.message === "Sorry! You can't rate your article"){
        return toast.error('Sorry! You can\'t rate your article');
      }
      return toast.error('Error while rating article');
    }); 
  }

  likeHandle = () => {
    let articleId = this.props.match.params.articleId;
    return this.props.likeArticle(articleId)
      .then((response) => {
        const message = response.data.data.message;
        toast.success(`${message}`)
      })
      .catch(error => {
        if(error.response && error.response.status === 401){
          toast.error('You need to login to like an article',{
            className: 'toast-custom-style'
          });
          return  this.setState({ showModal: true });
        }
        toast.error(`An error occurred when trying to like this article`, {
          className: 'toast-custom-style'
        });
      })
  }

  dislikeHandle = () => {
    let articleId = this.props.match.params.articleId;
    return this.props.dislikeArticle(articleId)
      .then((response) => {
        const message = response.data.data.message;
        toast.success(`${message}`)
      })
      .catch(error => {
        if(error.response && error.response.status === 401){
          toast.error('You need to login to dislike an article', {
            className: 'toast-custom-style'
          });
          return  this.setState({ showModal: true });
      }
        return toast.error('An error occurred while trying to dislike the article', {
          className: 'toast-custom-style'
        });
      })
          
  }

  bookmarkHandle = () => {
    let articleId = this.props.match.params.articleId;
    this.props.bookmarkArticle(articleId).then(() => { this.setState({BookMarkBtnColor: '#ffff00'}) })
   
    .catch(error => {
      if(error.response.status === 401){
        toast.error('You need to login to bookmark an article',{className: 'toast-custom-style'});
        return  this.setState({ showModal: true });    
     } else if(error.response.status === 409){
        return this.props.removeArticleBookmark(articleId).then(() => { this.setState({BookMarkBtnColor: '#fff'}) })
     }
      return toast.error('An error occurred while trying to bookmark this article', {
        className: 'toast-custom-style'
      });
    })
  }

  render() {
    const {
      userLiked, 
      userDisliked,
      userRating,
      impressions,
      averageRating,
      ratingsCount,
      match: { params: { articleId } },
      articles = [],
      comments,
      addComment,
    } = this.props;

    const { toggleModalOff, state: { showModal } } = this;

    const article = articles.find(item => item.id === articleId) || {};
    const commentsCount = this.props.comments.comments.length

    const { 
      title, 
      featuredImage = '/assets/img/map-typing.jpg', 
      author: { username = '', imageUrl: userAvatarImage = '' } = {}, 
      body,
    } = article;

    const totalLikes = impressions.likes.length;
    const totalDislikes = impressions.dislikes.length;

    return (
      <div>
        {showModal && <AuthModal toggleOff={toggleModalOff} content={'Login'} />}
        <div className='banner-section'>
          <div className='banner-image'>
            <img src={featuredImage} alt='banner background' />
          </div>
          <div className='transparent-overlay' />
          <div className='banner-content'>
            <div className='auto-container'>
              <div className='banner-content-title'>{title}</div>
              <div className='bookmark-button'>
                <BookMarkHeartIcon  onClick ={this.bookmarkHandle} btnColor = {this.state.BookMarkBtnColor}/>
              </div>
              <div className='avatar-text-group'>
                <div className='user-profile-picture'>
                  <RoundedImage imageSource={userAvatarImage || '/assets/img/placeholder-profile-picture.png'} alt='profile picture'/>
                  <VerticalMargin className='hide-for-medium' size={50} />
                </div>
                <HorizontalMargin className='show-for-medium' size={10} />
                <div className='article-username-rate-group'>
                  <div className='article-header-username'>{username}</div>
                  <div className ='article-rating-container'>
                    <div className='article-header-rating'>
                      <RatingStars rateNumber={(averageRating)} />
                    </div>
                    <div className='article-header-rated-times'>
                      {!ratingsCount ? 'No ratings yet' : `rated by ${ratingsCount} user${ratingsCount > 1 ? 's' : ''}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='body-section'>
          <div className='auto-container wide-padding'>
          <div className = "auto-container-body">
          <div className='impressions-container'>
              <div className='impression'>
                <CommentButtonGroup commentsCount = { commentsCount }/>
              </div>
              <div className='impression'>
                <LikeNumberGroup  onClick={this.likeHandle} btnColor = {userLiked && this.state.likeBtnColor} likeCount = {totalLikes || 0}/>
              </div>
              <div className='impression'>
                <DisLikeNumberGroup  onClick ={this.dislikeHandle} btnColor = {userDisliked && this.state.likeBtnColor} dislikeCount = {totalDislikes || 0}/>
              </div>
            </div>
            
            <div className='article-body'>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            </div>
            <div className="body-section-info-section">
            <HorizontalLine />
            <div className='section-article-info'>  
              <div>Rate this Article <RatingStarsBox starClickHandle= {this.starClickHandle} ratingNumber = {userRating || this.state.currentUserRating} /></div> 
              <div className='impressions-container-mobile'>
                <div className='impression'>
                  <CommentButtonGroup commentsCount = { commentsCount }/>
                </div>
                <div className='impression'>
                  <LikeNumberGroup  onClick={this.likeHandle} btnColor = {userLiked && this.state.likeBtnColor} likeCount = {totalLikes || 0}/>
                </div>
                <div className='impression'>
                <DisLikeNumberGroup  onClick ={this.dislikeHandle} btnColor = {userDisliked && this.state.likeBtnColor} dislikeCount = {totalDislikes || 0}/>
                </div>
              </div> 
              <VerticalMargin className='show-for-medium' size={10} />
              <div>
                <div className='section-comment-create'>
                  <div>Leave comments</div>
                  <CreateComment
                    articleId={articleId}
                    addComment={addComment}
                  />
                </div>
                <div className='section-user-comments'>
                  <CommentEntries comments={comments.comments} />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleArticleView.propTypes = {
  articles: PropTypes.array.isRequired,
  comments: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  getArticleAvgRating: PropTypes.func.isRequired,
  removeArticleBookmark: PropTypes.func,
  addComment: PropTypes.func,
  getArticleComments: PropTypes.func,
  likeArticle: PropTypes.func,
  dislikeArticle: PropTypes.func,
  bookmarkArticle: PropTypes.func,
  getArticleLikes: PropTypes.func,
  getArticleDislikes: PropTypes.func,
  id: PropTypes.string,
  currentUserId: PropTypes.string,
  userLiked: PropTypes.boolean,
  userDisliked: PropTypes.boolean,
  impressions: PropTypes.object,
  userRating: PropTypes.number,
  averageRating: PropTypes.number,
  ratingsCount: PropTypes.number,
  getUserBookmarks: PropTypes.func,
  toggleModalOff: PropTypes.func
}

const mapStateToProps = ({
  articles,
  comments,
  impressions = {},
  profile: { id: currentUserId }
}) => {
  const userLiked = !!impressions.likes.find(like => like.userId == currentUserId)
  const userDisliked = !!impressions.dislikes.find(disLike => disLike.userId == currentUserId)

  let foundRating = impressions.ratings.find(rating => rating.userId == currentUserId)
  const userRating = foundRating ? foundRating.rating : 0;

  const averageRating = impressions.ratings
    && impressions.ratings.reduce((totalRating, { rating }, i, { length }) => totalRating + rating/length, 0);
  
  const ratingsCount = impressions.ratings.length;

  return ({ 
    articles,
    comments,
    userLiked,
    userDisliked,
    userRating,
    currentUserId,
    impressions,
    averageRating,
    ratingsCount,
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(getOneArticle(id)),
  rateArticle: (rating, articleId) => dispatch(rateArticle(rating, articleId)),
  getArticleAvgRating: (articleId) => dispatch(getArticleAvgRating(articleId)),
  addComment: ({articleId, commentBody}) => dispatch(addComment({articleId, commentBody})),
  getArticleComments: (articleId) => dispatch(getArticleComments(articleId)),
  likeArticle: (articleId) => dispatch(likeArticle(articleId)),
  dislikeArticle: (articleId) => dispatch(dislikeArticle(articleId)),
  bookmarkArticle: (articleId) => dispatch(bookmarkArticle(articleId)),
  getArticleLikes: (articleId) => dispatch(getArticleLikes(articleId)),
  getArticleDislikes: (articleId) => dispatch(getArticleDislikes(articleId)),
  removeArticleBookmark: (articleId) => dispatch(removeArticleBookmark(articleId)),
  getUserBookmarks: (userId) => dispatch(getUserBookmarks(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleView);
