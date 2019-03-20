import { GET_CATEGORIES_SUCCESS } from '../actions/types';

const categoryReducerDefaultState = [	
	{
		id: 1,
		name:	'tech',
	},
	{
		id: 2,
		name:	'fashion',
	},
	{
		id: 3,
		name:	'health',
	},
	{
		id: 4,
		name:	'education',
	},
	{
		id: 5,
		name:	'lifestyle',
	},
	{
		id: 6,
		name:	'wellness',
	},
	{
		id: 7,
		name:	'politics',
	},
	{
		id: 8,
		name:	'design',
	},
	{
		id: 9,
		name:	'science',
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