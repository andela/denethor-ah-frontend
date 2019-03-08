import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 

import Login  from '../home/Banner/Login/Login';
import Signup from '../home/Banner/Signup/Signup';
import logo from '../../../public/assets/img/ah-logo.svg'
import './styles.scss';

ReactModal.setAppElement('#app');

const modalWrapper = (WrappedComponent) => (props) => (
  <div className='modal__wrapper'>
    <h3>{props.caption}</h3>
    <WrappedComponent />
  </div>
); 

const SignUpModal = modalWrapper(Signup);
const LoginModal = modalWrapper(Login);

const Modal = (props) => (
  <div>
    <ReactModal
      isOpen={!!props.isModal}
      onRequestClose={props.handleCloseModal}
      contentLabel="Selected Option"
      closeTimeoutMS={400}
      className="modal"
    >
      <button className='modal__close' onClick={props.handleCloseModal}>
        <FontAwesomeIcon 
          icon={faTimes}
          color='#ffffff'
          size='2x'
        />
      </button>
      <div className="logo-container">
        <div className="logo-container__image">
          <img src={logo} alt="Author's haven logo" />
        </div>
        <div className="logo-container__text">
          <h3>AUTHOR&apos;S HAVEN</h3>
        </div>
      </div>
      {props.isModal === 'Signup' && <SignUpModal caption='Create your Account' /> }
      {props.isModal === 'Login' && <LoginModal caption='Login to your Account' />}
    </ReactModal>
  </div>
);

export default Modal;