import React from 'react';
import Banner from './banner';
import { PostFeedTopSection } from '../feed/postFeedTopSection';
import FeedBottom from '../feed';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ bannerScreen, articles, categories }) => {
  return (
    <div className="home">
      <Banner bannerScreen={bannerScreen} />
      <PostFeedTopSection articles={articles} categories={categories} />
      <FeedBottom />
    </div>
  )
}

Home.propTypes = {
  bannerScreen: PropTypes.node.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
})


export default connect(mapStateToProps)(Home);