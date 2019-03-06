import React from 'react';
import './styles.scss';

const defaultProps = {
  writers: 100000,
  readers: 344555,
  topAuthors: [{
    imageUrl: '/assets/images/author1.png',
    firstName: 'Omoefe',
    articles: 674,
    followers: 783
  }, {
    imageUrl: '/assets/images/author2.png',
    firstName: 'Ibidapo',
    articles: 60,
    followers: 45
  }]
};

const Stats = (props) => {
  if(!props.writers) {
    props = defaultProps;
  }

  const { writers, readers, topAuthors: [author1, author2] } = props;

  const topAuthor = ({imageUrl, firstName, articles, followers }) => (
    <div className="author">
      <img src={imageUrl} alt={firstName} />
      <div>
        <h3>{firstName}</h3>
        <p><span className="banner__yellow-text">{`${articles}+`}</span> articles</p>
        <p><span className="banner__yellow-text">{`${followers}+`}</span> followers</p>
      </div>
    </div>
  );

  return (
      <div className="stats">
        <div className="stats__numbers stats__numbers--writers">
          <h2 className="banner__off-white-text">Connect with</h2>
          <h2>
            <span className="banner__yellow-text">{`${writers}+ `}</span>
            <span className="banner__off-white-text">writers</span>
          </h2>
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
          <h2 className="banner__off-white-text">Publish to</h2>
          <h2>
            <span className="banner__yellow-text">{`${readers}+ `} </span>
            <span className="banner__off-white-text">readers</span>
          </h2>
        </div>
      </div>
  );
};

export default Stats;