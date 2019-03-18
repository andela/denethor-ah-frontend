import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.scss';


export const Stats = (props) => {

  const { writers, readers, topAuthors: [author1, author2] } = props;

  const topAuthor = ({ imageUrl, firstname, articlesWritten, followers }) => (
    <div className="author">
      <img src={imageUrl} alt={firstname} />
      <div>
        <h3>{firstname}</h3>
        <p><span className="banner__yellow-text">{`${articlesWritten}+`}</span> articles</p>
        <p><span className="banner__yellow-text">{`${followers}+`}</span> followers</p>
      </div>
    </div>
  );

  topAuthor.propTypes={
    imageUrl: PropTypes.string,
    firstname: PropTypes.string,
    articlesWritten: PropTypes.number,
    followers: PropTypes.number
  }

  return (
    <div className="stats">
      <div className="stats__numbers stats__numbers--writers">
        <div>
          <h2 className="banner__off-white-text">Connect with</h2>
          <h2>
            <span className="banner__yellow-text">{`${writers}+ `}</span>
            <span className="banner__off-white-text">writers</span>
          </h2>
        </div>
      </div>
      <div className="stats__top-authors">
        <div>
          <h1 className="hidden-on-mobile">Join these <br /> successful writers</h1>
          <div className="stats__top-authors__authors">
            {topAuthor(author1)}
            {topAuthor(author2)}
          </div>
        </div>
      </div>
      <div className="stats__numbers stats__numbers--readers">
        <div>
          <h2 className="banner__off-white-text">Publish to</h2>
          <h2>
            <span className="banner__yellow-text">{`${readers}+ `} </span>
            <span className="banner__off-white-text">readers</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  writers: 12545,
  readers: 63843456,
  topAuthors: users.filter(({ id }) => (id === 'top1' || id === 'top2'))
});

Stats.propTypes={
 writers: PropTypes.number,
 readers: PropTypes.number,
 topAuthors: PropTypes.array
}

export default connect(mapStateToProps)(Stats);
