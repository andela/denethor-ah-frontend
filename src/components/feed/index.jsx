import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import FeedBottomLargeCard from './FeedBottomLargeCard';
import FeedBottomSmallCard from './FeedBottomSmallCard';
import { getArticles } from '../../redux/actions/articles';

class  FeedBottom extends React.Component {

  state = {
    selectedCategoryId: 0,
    toastId: 'articleErrorToast'
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
    let error;
    categories.forEach((category, index, { length }) => {
      return this.props.getArticles(category.name).then()
        .catch(() => {
          if (!error) {
            error = 'Error fetching article';
          }
          if (error && index === length - 1) {
            toast.error(error, {
              closeButton: false,
              hideProgressBar: true,
              toastId: this.state.toastId,
              className: 'toast-custom-style'
            });
          }
        });
    });
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