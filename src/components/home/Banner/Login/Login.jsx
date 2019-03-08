import React from 'react';

import SocialLoginBtn from './SocialLoginBtn';
import SocialLoginIcons from './SocialLoginIcons';
import './styles.scss';

export default () => (
  <div className='flex'>
    <div className='login-block'>
      <SocialLoginBtn />
      <form className='login-block__form'>
        <input type='name' placeholder='email' />
        <input type='password' placeholder='password' />
        <button className='button button--primary'>Login</button>
      </form>
      <SocialLoginIcons />
    </div>
  </div>
);