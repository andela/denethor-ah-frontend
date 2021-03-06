import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBottomSmallCard from '../feed/FeedBottomSmallCard';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';


export const UserPublications = (props) => {
  const {
    publishedArticles = [],
  } = props.profile;

  const notFoundContainer = <div>No Article Found</div>;

  const articles = publishedArticles.map(article => {
    article.featuredImage = extractImageFromBody(article.body);
    article.dateCreated =  toTimeFromNow(article.createdAt);
    return article;
  });

  const articlesExist = articles.length ? true : false;

  const articlesList = (
    <div className='flex filter-form'>
      {!articles.length && notFoundContainer}
      {articlesExist && (<h2 className='list-section-header'>Published Articles</h2>)}
      {articles.map((article) => (<FeedBottomSmallCard key={article.id} {...article} />))}
    </div>
  );

  return (
    <div>
      {articlesList}
    </div>
  );
};

UserPublications.propTypes = {
  profile: PropTypes.object,
  history: PropTypes.object,
};

function mapStateToProps ({ profile }) { 
  return {
    profile,
  }
}

export default connect(mapStateToProps)(UserPublications);
