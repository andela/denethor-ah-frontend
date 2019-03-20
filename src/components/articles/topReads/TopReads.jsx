import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PostFeedTopSection } from '../../feed/postFeedTopSection';
import FeedBottom from '../../feed';

class TopReads extends React.Component {
  render() {
    const { articles, categories } = this.props;

    return (
      <div className="top-reads">
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
