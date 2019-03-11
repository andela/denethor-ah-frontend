import { ADD_USER, REMOVE_USER } from '../actions/types';

const userReducerDefaultState = [{
  "id": "top1",
  "firstname": "Muna",
  "lastname": "Dukuye",
  "username": "omoisgood7179",
  "role": "author",
  "notifications": true,
  "bio": null,
  "imageUrl": "https://i.imgur.com/d4AI2Nh.jpg",
  "createdAt": "2019-03-07T21:05:08.071Z",
  "followers": 432485,
  "userArticles": [{
    "id": "8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a",
    "slug": "they-said-the-titile-length-must-be-at-least-5",
    "description": "description is not allowed to be empty so I added this"
  }, {
    "id": "8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a",
    "slug": "they-said-the-titile-length-must-be-at-least-5",
    "description": "description is not allowed to be empty so I added this"
  }],
  "articlesWritten": 193
}, {
  "id": "top2",
  "firstname": "Omoefe",
  "lastname": "Dukuye",
  "username": "omoisgood7179",
  "role": "author",
  "notifications": true,
  "bio": null,
  "imageUrl": "https://i.imgur.com/ws9TUUN.jpg",
  "createdAt": "2019-03-07T21:05:08.071Z",
  "followers": 232848,
  "userArticles": [{
    "id": "8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a",
    "slug": "they-said-the-titile-length-must-be-at-least-5",
    "description": "description is not allowed to be empty so I added this"
  }],
  "articlesWritten": 126
}];

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];

    case REMOVE_USER:
      return state.filter(({ id }) => id !== action.id );

    default:
      return state;
  }
};