import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import RoundedImage from '../../components/RoundedImage';
import VerticalMargin from '../../components/VerticalMargin';
import HorizontalMargin from '../../components/HorizontalMargin';
import { RatingStars, RatingStarsBox } from '../../components/rating-stars';
import { HorizontalLine } from '../../components/horizontal-line';
import { CreateComment } from '../comments';
import { CommentEntries } from '../comments';
import { addComment } from '../../redux/actions/comments';
import { getOneArticle, rateArticle, getArticleAvgRating } from '../../redux/actions/articles';
import { getArticleComments } from '../../redux/actions/comments'
import './style.scss';
import Spinner from '../spinner/Spinner';


export class SingleArticleView extends Component {

  async componentDidMount() {
    const { fetchArticle, getArticleAvgRating, match } = this.props;
    let articleId = match.params.articleId;
    await fetchArticle(articleId);
    getArticleAvgRating(articleId);
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
    });
  }

  render() {
    const {
      match: { params: { articleId } },
      articles = [],
      addComment,
      comments,
    } = this.props;
    const { loading } = comments;
    const article = articles.find(item => item.id === articleId) || {};
    const { 
      title, 
      featuredImage = '/assets/img/map-typing.jpg', 
      author: { username = '', imageUrl: userAvatarImage = '' } = {}, 
      body,
      averageRating,
      ratingsCount,
      comments: articleComments = [],
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
              <div>Rate this Article <RatingStarsBox starClickHandle= {this.starClickHandle.bind(this)} /></div>  
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
                  <CommentEntries comments={ comments.comments.length ? comments.comments : articleComments } />
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
  comments: PropTypes.object,
  addComment: PropTypes.func,
  getArticleComments: PropTypes.func
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  comments: state.comments
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(getOneArticle(id)),
  rateArticle: (rating, articleId) => dispatch(rateArticle(rating, articleId)),
  getArticleAvgRating: (articleId) => dispatch(getArticleAvgRating(articleId)),
  addComment: ({articleId, commentBody}) => dispatch(addComment({articleId, commentBody})),
  getArticleComments: (articleId) => dispatch(getArticleComments(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleView);