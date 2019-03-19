import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { TextAreaInput } from '../textarea';
import Button from '../Button';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentBody: ''
        };
    }

    handleOnChangeComment = (event) => {
        this.setState({ commentBody: event.target.value });
    }

    handleOnClick = (e) => {
        e.preventDefault();
        const { articleId } = this.props;
        const { commentBody } = this.state;
        this.props.addComment({ articleId, commentBody })
        .then()
        .catch(error => {
        const { response } = error;
          if (response && response.status === 422){
            return toast.error(error.response.data.message.details[0].message);
          }
          if (response && response.status === 404){
            return toast.error(error.response.data.message.details[0].message);
          }
          if(response && response.status === 401){
            toast.error('You need to login to comment on this article');
          }
          else{toast.error('You appear to be offline. Please check your Internet Connection');
        }
        });
        this.setState({
            commentBody: ''
          });
    }
    render() {
        const { commentBody }  = this.state;
        return (
            <div className='comment-create-field'>
            < TextAreaInput
                className='article-comment-field' 
                placeHolder='Your message'
                value={commentBody}
                onChange={this.handleOnChangeComment}
            />
            <Button
            className='article-comment-field__button' 
            type='submit' 
            value='submit'
            onClick={this.handleOnClick}
            />
            </div>
        );
    }
}

Comment.propTypes = {
    articleId: PropTypes.string.isRequired,
    addComment: PropTypes.func,
    value: PropTypes.string,
};