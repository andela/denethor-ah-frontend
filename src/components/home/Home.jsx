import React from 'react';
import Banner from './Banner';
import FeedBottom from '../feed/FeedBottom';
import './styles.scss';


const Home = (props) => {
  return (
    <div className="home">
      <Banner side={props.side} handleSignup={props.handleSignup} />
      <FeedBottom />
    </div>
  )
}

export default Home;
