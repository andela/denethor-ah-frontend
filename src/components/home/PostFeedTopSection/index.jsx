import React, { Component } from "react";
import { connect } from 'react-redux';
import PostCard from '../PostCard';
import PropTypes from 'prop-types';
import './style.scss';
import { getArticles } from "../../../redux/actions/articles";

export class PostStreamTopSection extends Component {

  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const sectionArticles = [];
    const { articles, categories } = this.props;

    articles.forEach((item, index) => {
      // stop loading articles after the 4th item
      if(index > 3) return;
  
      const indexToSizeMap = {
        0: 'big',
        1: 'small first',
        2: 'small second',
        3: 'wide',
      };
  
      const size = indexToSizeMap[index];
  
      const postEntry = <PostCard key={item.id} categories={categories} article={item} size={size} />;
  
      sectionArticles.push(postEntry);
    });
  
    return (
      <div className='auto-container'>
        <div className='section-title'>Latest Publications</div>
        <div className='post-stream-top'>
          {sectionArticles}
        </div>
      </div>
    )
  }
}

PostStreamTopSection.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(getArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostStreamTopSection);