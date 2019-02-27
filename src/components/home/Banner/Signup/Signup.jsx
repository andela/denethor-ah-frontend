import React from 'react'; 

import SocialLoginBtn from '../Login/SocialLoginBtn';
import SocialLoginIcons from '../Login/SocialLoginIcons';

import './styles.scss';

export default () => (
  <div className='flex'>
    <div className='register-block'>
      <SocialLoginBtn />
      <form className='register-block__form'>
        <input type='text' placeholder='first name' />
        <input type='text' placeholder='last name' />
        <input type='text' placeholder='username' />
        <input type='email' placeholder='email' />
        <input type='password' placeholder='password' />
        <button className='button button--primary'>Sign Up</button>
      </form>
      <SocialLoginIcons />
    </div>
  </div>
);