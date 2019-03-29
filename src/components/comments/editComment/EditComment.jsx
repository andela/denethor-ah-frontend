import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import CommentEntries from '../CommentEntries';
import './styles.scss';
 
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export class EditComment extends Component {
  state = {
    showModal: false,
    showHistory: false
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  }

  showHistory = (showHistory) => {
    this.setState({ showHistory });
  }

  render() {
    const { showModal, showHistory } = this.state;
    const { toggleMode, id, comment: { commentHistories = [], user: { id: commenterId } = {} } } = this.props;
    const isAuthor = id === commenterId;

    return (
      <div className='comment__edit-comment'>
        <Modal
          isOpen={showHistory}
          onRequestClose={() => this.showHistory(false)}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <CommentEntries comments={commentHistories} />
        </Modal>

        <p>{commentHistories[0] && 'edited'}</p>
        {
          (isAuthor || commentHistories[0])
            && <FontAwesomeIcon icon={faEllipsisH} onClick={this.toggleModal} />
        }
        {showModal && <Dropdown
          toggleModal={this.toggleModal}
          isAuthor={isAuthor}
          toggleMode={toggleMode}
          showHistory={this.showHistory}
          hasHistory={commentHistories[0]}
          />}
      </div>
    );
  }
}

EditComment.propTypes = {
  comment: PropTypes.object,
  id: PropTypes.string,
  toggleMode: PropTypes.func,
  showHistory: PropTypes.func
};

const mapStateToProps = ({ profile: { id } }) => ({ id });

export default connect(mapStateToProps)(EditComment);
