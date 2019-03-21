import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../../components/profile/Profile';
import profile from '../../mock-data/profile';

jest.mock('../../../utils/socket.js');

test('Should render component correctly with published articles', () => {
  const wrapper = shallow(<Profile profile={profile.data} />);

  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('ArticleListItem').length).toBe(profile.data.publishedArticles.length);
});

test('Should render component correctly without published articles', () => {
  const props = {
    profile: {
      ...profile.data,
      publishedArticles: []
    }
  };

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper).toMatchSnapshot();

  expect(wrapper.find('.profile__article-section__no-articles p').text()).toBe('No articles yet.');
});

test('Should render nothing if information has not loaded', () => {
  const props = {
    profile: {
      ...profile.data,
      followers: undefined,
      following: undefined,
      userAverageRating: {
        averageRating: 4,
        ratingCount: 50
      }
    }
  };

  delete props.profile.publishedArticles;

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper).toMatchSnapshot();
});

test('Should indicate if user has not been rated', () => {
  const props = {
    profile: {
      ...profile.data,
      userAverageRating: {
        averageRating: 0,
        ratingCount: 0
      }
    }
  };

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper).toMatchSnapshot();
});

test('Should use singular if one rater', () => {
  const props = {
    profile: {
      ...profile.data,
      userAverageRating: {
        averageRating: 4,
        ratingCount: 1
      }
    }
  };

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper).toMatchSnapshot();
});

test('Should use default imageUrl for empty image', () => {
  const props = {
    profile: {
      ...profile.data,
      publishedArticles: [],
      imageUrl: undefined
    }
  };

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper.find('RoundedImage').prop('imageSource')).toBe('/assets/img/placeholder-profile-picture.png');
});

test('Should use empty spaces for non-existent fields', () => {
  const props = {
    profile: {
      ...profile.data,
      firstname: undefined,
      lastname: undefined,
      username: undefined,
      bio: undefined
    }
  };

  const wrapper = shallow(<Profile {...props} />);

  expect(wrapper).toMatchSnapshot();
});
