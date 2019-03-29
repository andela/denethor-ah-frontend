import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import EditComment from './editComment';
import EditCommentEntry from './editCommentEntry';
import { CommentImpressionButton } from "../impressionIcons";

export class CommentEntry extends Component {
  state = {
    mode: 'read'
  }

  toggleMode = (mode) => {
    this.setState({ mode })
  }

  render() {
    const {
      comment,
      comment: {
        commentBody,
        user: { firstname, lastname } = {},
        id, createdAt
      },
      allCommentsImpressions = [], handleOnClickLike, isLoggedIn
    } = this.props;
    const username = `${firstname} ${lastname}`
    const date = format(
      new Date(createdAt),
      'MMM D YYYY, hh:mm a'
    );

    const impression = allCommentsImpressions.length
      ? allCommentsImpressions.find(commentImpression => commentImpression.commentId === id)
      : {};
    const impressionCount = impression
    ? impression.count
    : 0;
  
    const { liked } = impression || {};

    const { mode } = this.state;

    return (
      <div className='comment-entry'>
        {
          mode === 'read'
            ?
            <div className='comment-text'>
              <p>{commentBody}</p>

                <div className='comment-text__info'>
              {firstname && <p className='comment-text__user-name'>{username}</p>}
                  <p className='comment-text__date'>{date}</p>
                </div>
            </div>
            :
            <EditCommentEntry  comment={comment} toggleMode={this.toggleMode} />
        }
        {firstname && (
          <div className='actions'>
            <div className='likes-count'>
              <CommentImpressionButton likeImpression={liked} onClick={() => console.log('a')} likeCount={impressionCount} />
            </div>
            <div className='comment__edit-comment__wrapper'>
              {isLoggedIn && <EditComment comment={comment} toggleMode={this.toggleMode} />}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CommentEntry.propTypes = {
  comment: PropTypes.object,
  allCommentsImpressions: PropTypes.array,
  handleOnClickLike: PropTypes.func,
  likeImpression: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(CommentEntry);
