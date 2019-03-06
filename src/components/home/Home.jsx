import React from 'react';
import Banner from './Banner';
import './styles.scss';


const Header = (props) => {
  return (
    <div className="home">
      <Banner side={props.side} handleSignup={props.handleSignup} />
    </div>
  )
}

export default Header;