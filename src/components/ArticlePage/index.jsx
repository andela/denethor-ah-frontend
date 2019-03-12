import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundedImage from '../../components/RoundedImage';
import VerticalMargin from '../../components/VerticalMargin';
import HorizontalMargin from '../../components/HorizontalMargin';
import RatingStars from '../../components/RatingStars';
import RatingStarsBox from '../../components/RatingStarsBox';
import HorizontalLine from '../../components/HorizontalLine';
import TextAreaInput from '../../components/TextAreaInput';
import CommentEntries from '../../components/CommentEntries';
import { getOneArticle, rateArticle } from '../../redux/actions/articles';
import { toast } from 'react-toastify';
import './style.scss';


export class SingleArticleView extends Component {

  componentDidMount() {
    const { fetchArticle, match } = this.props;
    let articleId = match.params.articleId;
    fetchArticle(articleId);
  }

  starClickHandle(item) {
    let articleId = this.props.match.params.articleId;
    this.props.rateArticle(item, articleId )
    .then()
    .catch(function errorHandler() { 
      toast.error('Error while rating article');
    })
  }

  render() {
    const { match, articles = [] } = this.props;
    const { articleId } = match.params;
    const article = articles.find(item => item.id === articleId) || {};

    const { 
      title, 
      featuredImage = '/assets/img/map-typing.jpg', 
      author: { username = '', imageUrl: userAvatarImage = '' } = {}, 
      body,
      comments = []
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
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            <HorizontalLine />
            <div className='section-article-info'>  
              <div>Rate this Article <RatingStarsBox starClickHandle= {this.starClickHandle.bind(this)} rateNumber={2}/></div>
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
  rateArticle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(getOneArticle(id)),
  rateArticle: (rating, articleId) => dispatch(rateArticle(rating, articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleView);



