import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';
import './styles.scss';

const FilteredArticles = ({ articles }) => (
  <div className='flex filter-form'>
    {!articles.length && (<h2>No Article was found</h2>)}
    {!!articles.length && (<h2>Search Result</h2>)}
    {articles.map((article) => (<FeedBottomSmallCard key={article.id} {...article} />))}
  </div>
)

FilteredArticles.propTypes={
  articles: PropTypes.array
}

const mapStateToProps = ({ filters }) => ({ articles: filters });

export default connect(mapStateToProps)(FilteredArticles);