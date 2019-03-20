import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';
import './styles.scss';


export class UserBookmarks extends Component {

  state = {};

  async componentDidMount () {
    const { bookmarks } = this.props
    if (bookmarks) {
      this.setState({ bookmarks })
    }
  }

  async componentDidUpdate () {
    const { bookmarks } = this.props;
    if (bookmarks && !this.state.bookmarks) {
      this.setState({ bookmarks })
    }
  }

  render() {
    const { bookmarks } = this.state;
    return (
      <div className='flex filter-form bookmarks'>
        {!bookmarks
          ? ''
          : !bookmarks[0]
              ? <p>you have not bookmarked</p>
              : <React.Fragment>
                  <h2>Your Bookmarks</h2>
                  {
                    bookmarks.map(bookmark => <FeedBottomSmallCard
                    key={bookmark.id}
                    featuredImage={extractImageFromBody(bookmark.body)}
                    dateCreated={toTimeFromNow(bookmark.createdAt)}
                    {...bookmark} />)
                  }
              </React.Fragment>
        }
      </div>
    )
  }
}

UserBookmarks.propTypes = {
  getUserBookmarks: PropTypes.func,
  bookmarks: PropTypes.array,
  id: PropTypes.string
}

const mapStateToProps = ({ profile: { bookmarks } }) => ({ bookmarks });

export default connect(mapStateToProps)(UserBookmarks);
