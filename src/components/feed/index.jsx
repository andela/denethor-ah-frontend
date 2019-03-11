import React from 'react';
import FeedBottomLargeCard from './FeedBottomLargeCard';
import FeedBottomSmallCard from './FeedBottomSmallCard';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/actions/articles';
import { toast } from 'react-toastify';

class  FeedBottom extends React.Component {

  filterArticle = (selectedCategory) => {
    this.props.getArticles(selectedCategory).then().catch(function errorHandler() { toast.error('An error occurred while trying to get articles') })
  }

  componentDidMount() {
    this.props.getArticles().then().catch(function errorHandler() { toast.error('An error occurred while trying to get articles') })
  }

  render() {
    const { articles } = this.props;
    const _this = this;

    return (
      <div className="feed-bottom-section">
        <div className="nav-container-feed-bottom">
          <div className="top-categories-header"><h3>TOP CATEGORIES</h3></div>
          <div className="nav-items">
          <ul>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle()} }>ALL</button></li>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle('lifestyle')} }>LIFESTYLE</button></li>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle('fashion')} }>FASHION</button></li>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle('health')} }>HEALTH</button></li>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle('tech')} }>TECH</button></li>
          </ul>
        </div>
        </div>

        <div className="feed-bottom">
        {
            articles && articles.slice(0,1).map((article, index) => (
              <FeedBottomLargeCard key={index} {...article} />
            ))
          }
        <div className="feed-bottom-side">
          <div className="feed-container-article-block-first">
          {
            articles && articles.slice(1,5).map((article, index) => (
              <FeedBottomSmallCard key={index} {...article} />
            ))
          }
          </div>
          <div className="feed-container-article-block-second">
          {
            articles && articles.slice(6,10).map((article, index) => (
              <FeedBottomSmallCard key={index} {...article} />
            ))
          }
          </div> 
        </div>
      </div>  
      </div>  
    )
  }
}

const mapStateToProps = state => ({
  articles: state.articles || []
})

export default connect(mapStateToProps, {getArticles})(FeedBottom);