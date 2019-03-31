import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import RoundedImage from '../RoundedImage';
import VerticalMargin from '../VerticalMargin';
import HorizontalMargin from '../HorizontalMargin';
import { RatingStars, RatingStarsBox } from '../ratingStars';
import { HorizontalLine } from '../horizontalLine';
import { CreateComment, CommentEntries } from '../comments';
import { addComment, getArticleComments, getAllCommentsImpression, likeComment } from '../../redux/actions/comments';
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
import { showLoginModal } from '../../redux/actions/auth';
import { LikeNumberGroup , DisLikeNumberGroup, CommentButtonGroup } from '../likeNumberGroup';
import { BookMarkHeartIcon } from '../impressionIcons'
import { getHighlights } from '../../redux/actions/highlight';
import './style.scss';
import Spinner from '../spinner/Spinner';
import Highlight from '../highlight/CreateHighlight';
import toastOptions from '../../utils/toastOptions';
import HighlightEntries from '../highlight/HighlightEntries';

export class SingleArticleView extends Component {
  state = {
    likeBtnColor: '#822E2E',
    BookMarkBtnColor: '#ffffff',
    currentUserRating: 0,
    showCommentArea: false,
    highlightText: ''
  }

  async componentDidMount() {
    const { 
      fetchArticle, getArticleAvgRating, getArticleLikes, getArticleDislikes, 
      getAllCommentsImpression, match, currentUserId, getUserBookmarks, getHighlights 
    } = this.props;
    let articleId = match.params.articleId;

    document.getElementById('single-page').addEventListener('mouseup', this.onHighlight);

    const { comments } = await fetchArticle(articleId);
    const commentsIds = comments.map(comment => comment.id);
    await getAllCommentsImpression(commentsIds);
    getArticleLikes(articleId);
    getArticleDislikes(articleId);
    getArticleAvgRating(articleId);
    getHighlights(articleId);
    if (currentUserId && !this.state.currentUserId) {
      getUserBookmarks(currentUserId);
      this.setState({ currentUserId });
    }
  }

  toggleModalOff = () => {
    this.setState({ showModal: false });
  }

  onHighlight = (e) => {
    if (e.target.matches('.highlight-comment') ||
     e.target.matches('.article-comment-field__button')) return;

    if (window.getSelection) {
      const range = window.getSelection();
      this.setState({ highlightText: range.toString() });

      if (this.state.highlightText.length < 2) {
        this.setState({ showCommentArea: false });

      } else if (this.state.highlightText.length > 140) {
        this.setState({ showCommentArea: false });
        toast.error('Selection can\'t be more than 140 characters', toastOptions);
      } else {
        this.setState({ showCommentArea: true });
      }
    }
  }

  starClickHandle = (item) => {
    if(!this.props.isLoggedIn) {
      this.props.showLoginModal('Login');
      return toast.error('You need to login to rate an article');
    }
    let articleId = this.props.match.params.articleId;
    return this.props.rateArticle(item, articleId )
    .then(() => {
      this.setState({currentUserRating: item})
      toast.success('Thank you for rating this article')
    }) 
    .catch(error => {
      if (error.response.data.message === 'You already rated this article'){
        return toast.error('You have already rated this article');
      } else if(error.response.data === 'Unauthorized'){
         return toast.error('You need to login to rate an article');
      }else if (error.response.data.message === "Sorry! You can't rate your article"){
        return toast.error('Sorry! You can\'t rate your article');
      }
        return toast.error('Error while rating article');
    });
  }

  likeHandle = () => {
    if(!this.props.isLoggedIn) {
      this.props.showLoginModal('Login');
      return toast.error('You need to login to like an article');
    }
    let articleId = this.props.match.params.articleId;
    return this.props.likeArticle(articleId)
      .then((response) => {
        const message = response.data.data.message;
        toast.success(`${message}`)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          toast.error('You need to login to like an article', {
            className: 'toast-custom-style'
          });
          return this.props.showLoginModal('Login');
        }
        toast.error(`An error occurred when trying to like this article`, {
          className: 'toast-custom-style'
        });
      })
  }

  dislikeHandle = () => {
    if(!this.props.isLoggedIn) {
      this.props.showLoginModal('Login');
      return toast.error('You need to login to dislike an article');
    }
    let articleId = this.props.match.params.articleId;
    return this.props.dislikeArticle(articleId)
      .then((response) => {
        const message = response.data.data.message;
        toast.success(`${message}`)
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          toast.error('You need to login to dislike an article', {
            className: 'toast-custom-style'
          });
          return this.props.showLoginModal('Login');
      }
        return toast.error('An error occurred while trying to dislike the article', {
          className: 'toast-custom-style'
        });
      })

  }

  bookmarkHandle = () => {
    if(!this.props.isLoggedIn) {
      this.props.showLoginModal('Login');
      return toast.error('You need to login to bookmark an article');
    }
    let articleId = this.props.match.params.articleId;
    this.props.bookmarkArticle(articleId).then(() => { this.setState({BookMarkBtnColor: '#ffff00'}) })
   
    .catch(error => {
      if(error.response.status === 401){
        toast.error('You need to login to bookmark an article',{className: 'toast-custom-style'});
        return this.props.showLoginModal('Login');    
     } else if(error.response.status === 409){
        return this.props.removeArticleBookmark(articleId).then(() => { this.setState({BookMarkBtnColor: '#fff'}) })
     }
      return toast.error('An error occurred while trying to bookmark this article', {
        className: 'toast-custom-style'
      });
    })
  }

  handleOnClickLike = (commentId) => {
    if(!this.props.isLoggedIn) {
      this.props.showLoginModal('Login');
      return toast.error('You need to login to like this comment');
    }
    this.props.likeComment(commentId)
      .then()
      .catch(error => {
        const { response } = error;
        if (response && response.status === 422) {
          return toast.error(error.response.data.message.details[0].message);
        }
        if (response && response.status === 400) {
          return toast.error('You cannot like your own comment');
        }
        if(response && response.status === 401){
          toast.error('You need to login to like this comment');
          return this.props.showLoginModal('Login');
        }
        if (response && response.status === 500) {
          return toast.error('Server error');
        }
        else {
          return toast.error('unknown error');
        }
      });

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
      highlights
    } = this.props;

    const { state: { showCommentArea, highlightText } } = this;
    const { loading } = comments;
    const article = articles.find(item => item.id === articleId) || {};
    const commentsCount = this.props.comments.comments.length;

    const {
      title,
      featuredImage = '/assets/img/map-typing.jpg',
      author: { username = '', imageUrl: userAvatarImage = '' } = {},
      body,
      comments: articleComments = [],
    } = article;

    const totalLikes = impressions.likes.length;
    const totalDislikes = impressions.dislikes.length;

    return (
      <div id='single-page'>
        <div className='banner-section'>
          <div className='banner-image'>
            <img src={featuredImage} alt='banner background' />
          </div>
          <div className='transparent-overlay' />
          <div className='banner-content'>
            <div className='auto-container'>
              <div className='banner-content-title'>{title}</div>
              <div className='bookmark-button'>
                <BookMarkHeartIcon onClick={this.bookmarkHandle} btnColor={this.state.BookMarkBtnColor} />
              </div>
              <div className='avatar-text-group'>
                <div className='user-profile-picture'>
                  <RoundedImage imageSource={userAvatarImage || '/assets/img/placeholder-profile-picture.png'} alt='profile picture' />
                  <VerticalMargin className='hide-for-medium' size={50} />
                </div>
                <HorizontalMargin className='show-for-medium' size={10} />
                <div className='article-username-rate-group'>
                  <div className='article-header-username'>{username}</div>
                  <div className='article-rating-container'>
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
            <div className="auto-container-body">
              <div className='impressions-container'>
                <div className='impression'>
                  <CommentButtonGroup commentsCount={commentsCount} />
                </div>
                <div className='impression'>
                  <LikeNumberGroup onClick={this.likeHandle} btnColor={userLiked && this.state.likeBtnColor} likeCount={totalLikes || 0} />
                </div>
                <div className='impression'>
                  <DisLikeNumberGroup onClick={this.dislikeHandle} btnColor={userDisliked && this.state.likeBtnColor} dislikeCount={totalDislikes || 0} />
                </div>
              </div>

              <div className='article-body'>
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            </div>
            <div className="body-section-info-section">
              <HorizontalLine />
              <div className='section-article-info'>
                <div>Rate this Article <RatingStarsBox starClickHandle={this.starClickHandle} ratingNumber={userRating || this.state.currentUserRating} /></div>
                <div className='impressions-container-mobile'>
                  <div className='impression'>
                    <CommentButtonGroup commentsCount={commentsCount} />
                  </div>
                  <div className='impression'>
                    <LikeNumberGroup onClick={this.likeHandle} btnColor={userLiked && this.state.likeBtnColor} likeCount={totalLikes || 0} />
                  </div>
                  <div className='impression'>
                    <DisLikeNumberGroup onClick={this.dislikeHandle} btnColor={userDisliked && this.state.likeBtnColor} dislikeCount={totalDislikes || 0} />
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
                  <Spinner loading={loading} />
                  <div className='section-user-comments'>
                    <CommentEntries
                      handleOnClickLike={(id) => this.handleOnClickLike(id)}
                      allCommentsImpressions={comments.commentsLikes}
                      comments={comments.comments.length ? comments.comments : articleComments}
                    />
                  </div>
                </div>
                <div className='section-user-comments'>
                  <HighlightEntries highlights={highlights} />
                </div>
                {showCommentArea &&
                  (
                    <Highlight
                      id='highlight-comment'
                      highlightText={highlightText}
                      display={showCommentArea}
                      articleId={articleId}
                    />
                  )
                }
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
  userLiked: PropTypes.any,
  userDisliked: PropTypes.any,
  impressions: PropTypes.object,
  userRating: PropTypes.number,
  averageRating: PropTypes.number,
  ratingsCount: PropTypes.number,
  getUserBookmarks: PropTypes.func,
  toggleModalOff: PropTypes.func,
  getAllCommentsImpression: PropTypes.func,
  likeComment: PropTypes.func,
  commentId: PropTypes.string,
  showLoginModal: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  highlights: PropTypes.array,
  getHighlights: PropTypes.func
}

const mapStateToProps = ({
  auth: { isLoggedIn },
  articles,
  comments,
  impressions = {},
  profile: { id: currentUserId },
  highlights
}) => {
  const userLiked = !!impressions.likes.find(like => like.userId == currentUserId)
  const userDisliked = !!impressions.dislikes.find(disLike => disLike.userId == currentUserId)

  let foundRating = impressions.ratings.find(rating => rating.userId == currentUserId)
  const userRating = foundRating ? foundRating.rating : 0;

  const averageRating = impressions.ratings
    && impressions.ratings.reduce((totalRating, { rating }, i, { length }) => totalRating + rating / length, 0);

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
    isLoggedIn,
    highlights
  })
};

const mapDispatchToProps = ({
  fetchArticle: getOneArticle,
  rateArticle,
  getArticleAvgRating,
  addComment,
  getArticleComments,
  likeArticle,
  dislikeArticle,
  bookmarkArticle,
  getArticleLikes,
  getArticleDislikes,
  removeArticleBookmark,
  getUserBookmarks,
  getAllCommentsImpression,
  likeComment,
  showLoginModal,
  getHighlights
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleView);
