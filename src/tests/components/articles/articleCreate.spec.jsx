import React from 'react';
import { mount } from 'enzyme';
import uuid from 'uuid/v1';
import { Provider } from 'react-redux';
import storeConfig from '../../../redux/configureStore';
import { ArticleCreatePage } from '../../../components/articles/articleCreate/ArticleCreate';
import categories from '../../mock-data/categories';
	
const store = storeConfig();

jest.mock('uuid/v1');
jest.mock('../../../utils/socket.js');

uuid.mockReturnValue('string');

describe('Test for the article create component', () => {
	const props = {
		newArticleInput: {
      title: '<p class="md-block-unstyled">Are emotions necessary for human survival? Why or why not?</p>',
      description: '<p class="md-block-unstyled">Are emotions necessary for human survival? Why or why not?</p>',
      body: '<h2 class="md-block-header-two"><strong class="md-inline-bold">Our original read time calculation was geared toward “slow” images, like comics, where you would really want to sit down and invest in the image. </strong> </h2><figure class="md-block-image md-block-image-has-caption"><img src="http://res.cloudinary.com/jsamcloud12/image/upload/v1553592453/article-pictures/vsen4g0svk8afjma9r0c.jpg" alt="nodejs introduction" /><figcaption class="md-block-image-caption">nodejs introduction</figcaption></figure><p class="md-block-unstyled">This resulted in articles with crazy big read times. For instance, this article containing 140 images was clocking in at a whopping 87 minute read. So we amended our read time calculation to count 12 seconds for the first image, 11 for the second, and minus an additional second for each subsequent image. Any images after the tenth image are counted at three seconds.</p>',
      tags: 'tag1, tag2, tag3',
      references: ['reference1.example', 'reference2.example', 'reference3.example'],
      categoryId: '1',
    },
    saveInput: jest.fn(),
    categories,
    createArticle: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
  
	it('should render article create view page', () => {
		const wrapper = mount(<Provider store={store}><ArticleCreatePage {...props} /></Provider>);
		expect(wrapper.length).toBe(1);
    expect(wrapper.find('.post-content__body').length).toBe(1);
    expect(wrapper.find('.post-content').length).toBe(1);
    expect(wrapper.find('.post-content__header').length).toBe(1);
    expect(wrapper.find('.post-content__label').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('button.article-submit').length).toBe(1);
	});
});
