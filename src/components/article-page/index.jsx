import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundedImage from '../../components/RoundedImage';
import VerticalMargin from '../../components/VerticalMargin';
import HorizontalMargin from '../../components/HorizontalMargin';
import RatingStars from '../../components/RatingStars';
import RatingStarsBox from '../../components/RatingStarsBox';
import HorizontalLine from '../../components/horizontal-line';
import TextAreaInput from '../../components/TextAreaInput';
import CommentEntries from '../../components/CommentEntries';
import { getOneArticle, rateArticle, getArticleAvgRating, likeArticle, dislikeArticle, bookmarkArticle } from '../../redux/actions/articles';
import { toast } from 'react-toastify';
import './style.scss';
import { LikeNumberGroup , BookMarkNumberGroup, DisLikeNumberGroup } from '../like-number-group';
// import impressionsControl from '../../utils/impressionScroll';



export class SingleArticleView extends Component {

  async componentDidMount() {
    const { fetchArticle, getArticleAvgRating, match } = this.props;
    let articleId = match.params.articleId;
    await fetchArticle(articleId);
    getArticleAvgRating(articleId)
  }

  starClickHandle = (item) => {
    let articleId = this.props.match.params.articleId;
    this.props.rateArticle(item, articleId )
    .then(() => toast.success('Thank you for rating this article'))
    .catch(error => {
      if (error.response.data.message === 'You already rated this article'){
        return toast.error('You have already rated this article');
      } else if(error.response.data === 'Unauthorized'){
         toast.error('You need to login to rate an article');
        return  this.props.history.push('/login')
      }
      toast.error('Error while rating article');
    })
  }

  likeHandle = () => {
    let articleId = this.props.match.params.articleId;
    this.props.likeArticle(articleId)
    .then((response) => {
      const message = response.data.data.message;
      toast.success(`${message}`)
    })
    .catch(error => {
      if(error.response === 'Unauthorized'){
        return  toast.error('You need to login to like an article');
     }
       toast.error(`${error}`);
    })
  }

  dislikeHandle = () => {
    let articleId = this.props.match.params.articleId;
    this.props.dislikeArticle(articleId)
    .then((response) => {
      const message = response.data.data.message;
      toast.success(`${message}`)
    })
    .catch(error => {
      if(error.response === 'Unauthorized'){
        return toast.error('You need to login to dislike an article');
     }
      return toast.error('An error occurred while trying to dislike the article');
    })
  }

  bookmarkHandle = () => {
    let articleId = this.props.match.params.articleId;
    this.props.bookmarkArticle(articleId)
    .then(() => toast.success('Thank you for bookmarking this article'))
    .catch(error => {
      if(error.response === 'Unauthorized'){
        return toast.error('You need to login to bookmark an article');      
     } else if(error.response.status === 409){
       return toast.error('You have already bookmarked this article')
     }
      return toast.error('An error occurred while trying to bookmark this article');
    })
  }

  render() {
    const { match: { params: { articleId } }, articles = [] } = this.props;
    const article = articles.find(item => item.id === articleId) || {};
    const { 
      title, 
      featuredImage = '/assets/img/map-typing.jpg', 
      author: { username = '', imageUrl: userAvatarImage = '' } = {}, 
      body,
      averageRating,
      ratingsCount,
      comments = [],
    } = article;

    return (
      <div>
        <div className='banner-section'>
          <div className='banner-image'>
            <img src={featuredImage} alt='banner background' />
          </div>
          <div className='transparent-overlay' />
          <div className='banner-content'>
            <div className='auto-container'>
              <div className='banner-content-title'>{title}</div>
              <div className='avatar-text-group'>
                <div className='user-profile-picture'>
                  <RoundedImage imageSource={userAvatarImage} alt='profile picture'/>
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
            <div className='article-body'>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            <HorizontalLine />
            <div className='section-article-info'>  
              <div className='rate-impression'>
                <p>Rate this Article</p> <RatingStarsBox starClickHandle= {this.starClickHandle.bind(this)} /> 
              </div>  
              <div className='impressions-container'>
                <div className='impression'>
                 <LikeNumberGroup likeCount = {0} onClick={this.likeHandle.bind(this)}/>
                </div>
                <div className='impression'>
                <BookMarkNumberGroup bookMarkCount = {16} onClick ={this.bookmarkHandle.bind(this)}/>
                </div>
                <div className='impression'>
                <DisLikeNumberGroup dislikeCount = {0} onClick ={this.dislikeHandle.bind(this)} />
                </div>
              </div>
              <VerticalMargin className='show-for-medium' size={10} />
              <div>
                <div className='section-comment-create'>
                  <div>Leave comments</div>
                  <TextAreaInput className='article-comment-field' text='Your message' />
                  <button></button>
                </div>
                <div className='section-user-comments'>
                  <CommentEntries comments={comments} />
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
  match: PropTypes.object.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  getArticleAvgRating: PropTypes.func.isRequired,
  history: PropTypes.object,
  likeArticle: PropTypes.func,
  dislikeArticle: PropTypes.func,
  bookmarkArticle: PropTypes.func,
}

const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(getOneArticle(id)),
  rateArticle: (rating, articleId) => dispatch(rateArticle(rating, articleId)),
  getArticleAvgRating: (articleId) => dispatch(getArticleAvgRating(articleId)),
  likeArticle: (articleId) => dispatch(likeArticle(articleId)),
  dislikeArticle: (articleId) => dispatch(dislikeArticle(articleId)),
  bookmarkArticle: (articleId) => dispatch(bookmarkArticle(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleView);



