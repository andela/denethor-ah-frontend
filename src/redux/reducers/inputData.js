import { ADD_INPUT_DATA, CLEAR_INPUT_DATA } from '../actions/types';

const initialState = {
  createArticle: {
    title: '<p class="md-block-unstyled">Are emotions necessary for human survival? Why or why not?</p>',
    body: '<h2 class="md-block-header-two"><strong class="md-inline-bold">Our original read time calculation was geared toward “slow” images, like comics, where you would really want to sit down and invest in the image. </strong> </h2><figure class="md-block-image md-block-image-has-caption"><img src="http://res.cloudinary.com/jsamcloud12/image/upload/v1553592453/article-pictures/vsen4g0svk8afjma9r0c.jpg" alt="nodejs introduction" /><figcaption class="md-block-image-caption">nodejs introduction</figcaption></figure><p class="md-block-unstyled">This resulted in articles with crazy big read times. For instance, this article containing 140 images was clocking in at a whopping 87 minute read. So we amended our read time calculation to count 12 seconds for the first image, 11 for the second, and minus an additional second for each subsequent image. Any images after the tenth image are counted at three seconds.</p>',
    tags: 'tag1, tag2, tag3',
    categoryId: '1',
  }
}

// const initialState = {
//   createArticle: {
//     // title: '<p class="md-block-unstyled">Are emotions necessary for human survival? Why or why not?</p>',
//     // body: '<h2 class="md-block-header-two"><strong class="md-inline-bold">Our original read time calculation was geared toward “slow” images, like comics, where you would really want to sit down and invest in the image. </strong> </h2><figure class="md-block-image md-block-image-has-caption"><img src="http://res.cloudinary.com/jsamcloud12/image/upload/v1553592453/article-pictures/vsen4g0svk8afjma9r0c.jpg" alt="nodejs introduction" /><figcaption class="md-block-image-caption">nodejs introduction</figcaption></figure><p class="md-block-unstyled">This resulted in articles with crazy big read times. For instance, this article containing 140 images was clocking in at a whopping 87 minute read. So we amended our read time calculation to count 12 seconds for the first image, 11 for the second, and minus an additional second for each subsequent image. Any images after the tenth image are counted at three seconds.</p>',
//     // tags: 'tag1, tag2, tag3',
//     // categoryId: 1,
//   }
// }

const inputDataReducer = (state = initialState, action) => {
  let process, field, value;
  let newState;
  switch(action.type) {
    case ADD_INPUT_DATA:
      ({ payload: { process, field, value }} = action);
      return {
        ...state,
        [process]: {
          ...state[process],
          [field]: value
        }
      }
    case CLEAR_INPUT_DATA:
      newState = {...state};
      delete newState[process];
      return newState;
    default:
      return state;
  }
}

export default inputDataReducer;