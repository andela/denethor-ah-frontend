import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Screen from '../home/banner/screen';
import './styles.scss';

class AuthModal extends Component {
  componentDidMount () {
    document.addEventListener('click', this.handleToggle);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleToggle);
  }

  handleToggle = ({ target }) => {
    if (this.modal.contains(target)) return;

    this.props.toggleOff();
  };

  render() { 
    if (this.props.isLoggedIn) {
      return <Redirect to={this.props.history.location.pathname}/>
    }

    const { content } = this.props;

    return (
      <div className="auth-modal__background">
        <div className="auth-modal__modal" ref={node => this.modal = node}>
          <Screen content={content} modal={true}/>
        </div>
      </div>
    );
  }
}

AuthModal.propTypes = {
  content: PropTypes.string,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  toggleOff: PropTypes.func
}

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(withRouter(AuthModal));
