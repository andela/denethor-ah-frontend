import React from 'react';
import Banner from './Banner';


const Home = (props) => {
  return (
    <div className="home">
      <Banner side={props.side} handleSignup={props.handleSignup} />
    </div>
  )
}

export default Home;
