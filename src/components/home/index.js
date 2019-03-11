import React from 'react';
import Banner from './Banner';
import PostFeedTopSection from './PostFeedTopSection';
import FeedBottom from '../feed';

const Home = (props) => {
  return (
    <div className="home">
      <Banner side={props.side} handleSignup={props.handleSignup} />
      <PostFeedTopSection />
      <FeedBottom />
    </div>
  )
}

export default Home;
