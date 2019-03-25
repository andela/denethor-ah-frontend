import '@babel/polyfill';
import impressionsReducer from '../../../redux/reducers/impressions'
import articles from '../../mock-data/articles';
import {
  LIKE_ARTICLE_SUCCESS, 
  DISLIKE_ARTICLE_SUCCESS, 
  GET_ARTICLE_LIKES_SUCCESS, 
  GET_ARTICLE_DISLIKES_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS,
  REMOVE_ARTICLE_BOOKMARK_SUCCESS,
  RATE_ARTICLE_SUCCESS,
} from '../../../redux/actions/types';

it('Should handle RATE_ARTICLE_SUCCESS', () => {
  const ratedArticle = articles[0];
  const state = impressionsReducer(articles, {
    type: RATE_ARTICLE_SUCCESS,
    payload: ratedArticle
  });
  expect(state).toContainEqual(ratedArticle);
});

it('Should handle LIKE_ARTICLE_SUCCESS', () => {
  const likedArticle = {
    "message": "You disliked this Article!",
    "impression": {
        "likeImpression": true,
        "id": "f4814a35-e613-4b54-ada1-0ab14d80f82e",
        "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
        "userId": "2c05a3d8-1acd-4181-8883-dbb0d86fb6fd",
        "dislikeImpression": false,
        "updatedAt": "2019-03-25T11:25:41.718Z",
        "createdAt": "2019-03-25T11:25:41.718Z"
    }
};
  const state = impressionsReducer(undefined,
  {
    type: LIKE_ARTICLE_SUCCESS,
    payload: likedArticle
  });

  expect(state.likes).toEqual([likedArticle.impression]);
});

it('Should handle DISLIKE_ARTICLE_SUCCESS', () => {
  const dislikedArticle = {
    "message": "You disliked this Article!",
    "impression": {
        "likeImpression": false,
        "id": "f4814a35-e613-4b54-ada1-0ab14d80f87e",
        "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e854d7",
        "userId": "2c05a3d8-1acd-4181-8883-dbb0d86fb3fd",
        "dislikeImpression": true,
        "updatedAt": "2019-03-25T11:25:41.718Z",
        "createdAt": "2019-03-25T11:25:41.718Z"
    }
};
  const state = impressionsReducer(undefined, {
    type: DISLIKE_ARTICLE_SUCCESS,
    payload: dislikedArticle
  });
  expect(state.dislikes).toEqual([dislikedArticle.impression]);
});

it('Should handle GET_ARTICLE_LIKES_SUCCESS', () => {
   const likedArticlesArray = [
        {
          "id": "f4814a35-e613-4b54-ada1-0ab14d80f82e",
          "likeImpression": true,
          "dislikeImpression": false,
          "createdAt": "2019-03-25T11:25:41.718Z",
          "updatedAt": "2019-03-25T11:25:41.718Z",
          "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
          "userId": "2c05a3d8-1acd-4181-8883-dbb0d86fb6fd"
      },
      {
          "id": "e654a653-3928-4c74-83eb-60844eb3d9b7",
          "likeImpression": true,
          "dislikeImpression": false,
          "createdAt": "2019-03-22T15:44:49.966Z",
          "updatedAt": "2019-03-22T15:44:53.750Z",
          "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
          "userId": "df3d4667-d7f2-4904-a486-5ad35956e363"
      }
  ];
 const state = impressionsReducer( {
  likes: [],
  dislikes: [],
  ratings: [],
  userBookmarks: [],
}, {
    type: GET_ARTICLE_LIKES_SUCCESS,
    payload: likedArticlesArray
  });
  expect(state.likes).toEqual(likedArticlesArray);
});

it('Should handle GET_ARTICLE_DISLIKES_SUCCESS', () => {
  const dislikedArticlesArray = [
    {
      "id": "f4814a35-e613-4b54-ada1-0ab14d80f82e",
      "likeImpression": false,
      "dislikeImpression": true,
      "createdAt": "2019-03-25T11:25:41.718Z",
      "updatedAt": "2019-03-25T11:25:41.718Z",
      "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
      "userId": "2c05a3d8-1acd-4181-8883-dbb0d86fb6fd"
  },
  {
      "id": "e654a653-3928-4c74-83eb-60844eb3d9b7",
      "likeImpression": false,
      "dislikeImpression": true,
      "createdAt": "2019-03-22T15:44:49.966Z",
      "updatedAt": "2019-03-22T15:44:53.750Z",
      "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
      "userId": "df3d4667-d7f2-4904-a486-5ad35956e363"
  }
];
const state = impressionsReducer( {
likes: [],
dislikes: [],
ratings: [],
userBookmarks: [],
}, {
type: GET_ARTICLE_DISLIKES_SUCCESS,
payload: dislikedArticlesArray
});
expect(state.dislikes).toEqual(dislikedArticlesArray);
});

it('Should handle BOOKMARK_ARTICLE_SUCCESS', () => {
  const state = impressionsReducer(undefined, {
    type: BOOKMARK_ARTICLE_SUCCESS,
    payload:   {
      "id": "e654a653-3928-4c74-83eb-60844eb3d9b7",
      "likeImpression": false,
      "dislikeImpression": true,
      "createdAt": "2019-03-22T15:44:49.966Z",
      "updatedAt": "2019-03-22T15:44:53.750Z",
      "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
      "userId": "df3d4667-d7f2-4904-a486-5ad35956e363"
  }
  });
  expect(state.userBookMarked).toEqual(true);
});

it('Should handle REMOVE_ARTICLE_BOOKMARK_SUCCESS', () => {
  const state = impressionsReducer(undefined, {
    type: REMOVE_ARTICLE_BOOKMARK_SUCCESS,
    payload:   {
      "id": "e654a653-3928-4c74-83eb-60844eb3d9b7",
      "likeImpression": false,
      "dislikeImpression": true,
      "createdAt": "2019-03-22T15:44:49.966Z",
      "updatedAt": "2019-03-22T15:44:53.750Z",
      "articleId": "bfc3d978-ebcd-49dc-bd4e-6b0727e857d7",
      "userId": "df3d4667-d7f2-4904-a486-5ad35956e363"
  }
  });
  expect(state.userBookMarked).toEqual(false);
});