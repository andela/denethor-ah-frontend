import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PostFeedTopSection } from '../../feed/postFeedTopSection';
import FeedBottom from '../../feed';
import SearchForm from '../../searchForm/SearchForm';

class TopReads extends React.Component {
  render() {
    const { articles, categories } = this.props;

    return (
      <div className="top-reads">
        <SearchForm {...this.props} isSearchonly={false} className='top-reads__search' />
        <PostFeedTopSection articles={articles} categories={categories} />
        <FeedBottom articles={articles} />
      </div>
    )
  }
}

TopReads.propTypes = {
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
})


export default connect(mapStateToProps)(TopReads);
