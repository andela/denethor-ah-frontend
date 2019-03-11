import { GET_CATEGORIES_SUCCESS } from '../actions/types';

const categoryReducerDefaultState = [
	{
		id: 1,
		name: 'tech'
	},
	{
		id: 2,
		name: 'fashion'
	},
	{
		id: 3,
		name: 'lifestyle'
	},
	{
		id: 4,
		name: 'health'
	},
	{
		id: 5,
		name: 'science'
	},
	{
		id: 6,
		name: 'politics'
	},
];    

export default (state = categoryReducerDefaultState, action) => {
  switch (action.type) {
    
    case GET_CATEGORIES_SUCCESS:
        return [...action.payload];

    default:
      return state;
  }
};