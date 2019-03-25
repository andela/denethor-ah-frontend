import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import FeedBottomSmallCard from '../../feed/FeedBottomSmallCard';
import { getArticles } from '../../../redux/actions/articles';
import './style.scss';

class  CategoriesPage extends React.Component {

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

    const { location: { search } } = this.props;
    const queryKeys = queryString.parse(search);
    const categoryName = queryKeys.category;

    this.filterArticle(categoryName);

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
    const { articles} = this.props;
    const { selectedCategoryId } = this.state;

    const filteredArticles = selectedCategoryId !== 0 ? articles.filter(article => article.categoryId === selectedCategoryId) : articles;

    return (
      <div className="feed-bottom-section">
        <div className="nav-container-feed-bottom">
        </div>

        <div className="feed-bottom">
        <div className="feed-bottom-side">
          <div className="feed-container-article-block-first">
          {
            filteredArticles && filteredArticles.slice(0,4).map((article, index) => (
              <FeedBottomSmallCard key={index} {...article} />
            ))
          }
          </div>
          <div className="feed-container-article-block-second">
          {
            filteredArticles && filteredArticles.slice(5,10).map((article, index) => (
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

CategoriesPage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  articles: state.articles || [],
  categories: state.categories || []
})

export default connect(mapStateToProps, {getArticles})(CategoriesPage);