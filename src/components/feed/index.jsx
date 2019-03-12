import React from 'react';
import FeedBottomLargeCard from './FeedBottomLargeCard';
import FeedBottomSmallCard from './FeedBottomSmallCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticles } from '../../redux/actions/articles';
import { toast } from 'react-toastify';

class  FeedBottom extends React.Component {

  state = {
    selectedCategoryId: 0
  }

  filterArticle = (categoryName) => {

    const { categories } = this.props;
    const selectedCategory = categories.find(category => category.name === categoryName) || {};

    this.setState({
      selectedCategoryId: selectedCategory.id || 0
    });
  }

  componentDidMount() {
    const { categories } = this.props;
    categories.forEach(category => {
      this.props.getArticles(category.name)
        .then()
        .catch(function errorHandler() { toast.error('An error occurred while trying to get articles') })
    })
  }

  render() {
    const { articles, categories } = this.props;
    const _this = this;
    const { selectedCategoryId } = this.state;

    const filteredArticles = selectedCategoryId !== 0 ? articles.filter(article => article.categoryId === selectedCategoryId) : articles;

    const categoryFilterButtons = categories.slice(0,4).map(category => {
      return (
        <li key={category.id}><button className="category-buttons" onClick={function filter() { _this.filterArticle(category.name)} }>{category.name}</button></li>
      )
    });
    return (
      <div className="feed-bottom-section">
        <div className="nav-container-feed-bottom">
          <div className="top-categories-header"><h3>TOP CATEGORIES</h3></div>
          <div className="nav-items">
          <ul>
            <li><button className="category-buttons" onClick={function filter() { _this.filterArticle()} }>ALL</button></li>
            {categoryFilterButtons}
          </ul>
        </div>
        </div>

        <div className="feed-bottom">
        {
            filteredArticles && filteredArticles.slice(0,1).map((article, index) => (
              <FeedBottomLargeCard key={index} {...article} />
            ))
          }
        <div className="feed-bottom-side">
          <div className="feed-container-article-block-first">
          {
            filteredArticles && filteredArticles.slice(1,5).map((article, index) => (
              <FeedBottomSmallCard key={index} {...article} />
            ))
          }
          </div>
          <div className="feed-container-article-block-second">
          {
            filteredArticles && filteredArticles.slice(6,10).map((article, index) => (
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

FeedBottom.propTypes = {
  getArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  articles: state.articles || [],
  categories: state.categories || []
})

export default connect(mapStateToProps, {getArticles})(FeedBottom);