import React from 'react';
import Banner from './Banner';
import PostFeedTopSection from './PostFeedTopSection';
import './styles.scss';

const Home = (props) => {
  return (
    <div className="home">
      <Banner side={props.side} handleSignup={props.handleSignup} />
      <PostFeedTopSection  />
    </div>
  )
}

export default Home;