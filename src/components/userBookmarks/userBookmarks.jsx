import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userBookmarks } from '../../redux/actions/profile';
import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';


export class UserBookmarks extends Component {

  componentDidMount() {
    userBookmarks(this.props.id)
  }

  render() {
    return(
      <div>
        <p>you have not bookmarked</p>
        <FeedBottomSmallCard/>
      </div>
    )
  }
}

UserBookmarks.propTypes = {
  id: PropTypes.string
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = (dispatch) => ({
  userBookmarks: (userId) => dispatch(userBookmarks(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBookmarks);