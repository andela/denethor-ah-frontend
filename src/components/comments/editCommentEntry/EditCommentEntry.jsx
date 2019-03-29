import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { TextAreaInput } from '../../textarea';
import Button from '../../Button';
import './styles.scss';
import { editComment } from '../../../redux/actions/comments';

export class EditCommentEntry extends Component {
  state = {
    commentBody: ''
  }

  componentDidMount() {
    const { comment: { commentBody, id } } = this.props;
    this.setState({ commentBody, id });
  }

  handleOnChangeComment = ({ target: { value: commentBody } }) => {
    this.setState({ commentBody });
  }

  handleOnClick = async () => {
    const { location: { pathname } } = this.props;
    const articleId = pathname.slice(pathname.lastIndexOf('/') + 1);
    const { commentBody, id } = this.state;
    const { editComment } = this.props;

    try {
      await editComment(articleId, id, commentBody);
      toast.success('comment updated successfully');
    } catch (error) {
      toast.error('error updating comment')
    }
  }

  render() {
    const { commentBody }  = this.state;
    const { toggleMode } = this.props;

    return (
        <div className='comment-create-field'>
          < TextAreaInput
              className='article-comment-field' 
              value={commentBody}
              placeHolder={'Enter comment'}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              onChange={this.handleOnChangeComment}
          />
          <div className='comment-edit-actions'>
            <Button
            className='article-comment-field__button' 
            type='submit' 
            value='submit'
            onClick={this.handleOnClick}
            />
            <Button
            className='article-comment-field__button' 
            type='button' 
            value='cancel'
            onClick={() => { toggleMode('read') }}
            />
          </div>
        </div>
    );
  }
}

EditCommentEntry.propTypes = {
  comment: PropTypes.object,
  editComment: PropTypes.func,
  id: PropTypes.string,
  toggleMode: PropTypes.func,
  location: PropTypes.object
}

export default connect(undefined, { editComment })(withRouter(EditCommentEntry));
