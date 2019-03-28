import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';

import { SearchForm } from '../../../components/searchForm/SearchForm';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig');

test('Should render search form', () => {
  const props = { location: { pathname: '/' }, profile: { username: undefined } };
  const wrapper = shallow(<SearchForm {...props} />);

  expect(wrapper).toMatchSnapshot();
});

it('Should set searchString state on input change', () => {
  const value = 'foobar';
  const props = { 
    location: { pathname: '/' }, profile: { username: undefined }, isLoggedIn: true 
  };
  const wrapper = shallow(<SearchForm {...props} />);
  

  wrapper.find('input').at(0).simulate('change', { target: { value } });
  expect(wrapper.state('searchString')).toBe(value);
});

it('Should set author state on input change', () => {
  const value = 'foobar';
  const props = { 
    location: { pathname: '/' }, profile: { username: undefined }, isLoggedIn: true 
  };
  const wrapper = shallow(<SearchForm {...props} isSearchOnly={false} />);
  wrapper.find(Select).at(0).props().onChange({ value });
  expect(wrapper.state('selectedAuthor')).toEqual({ value });
});

it('Should set tag state on input change', () => {
  const value = 'foobar';
  const props = { 
    location: { pathname: '/' }, profile: { username: undefined }, isLoggedIn: true 
  };
  const wrapper = shallow(<SearchForm {...props} isSearchOnly={false} />);
  wrapper.find(Select).at(1).props().onChange({ value });
  expect(wrapper.state('selectedTag')).toEqual({ value });
});

it('Should call onSubmit for invalid form submission', () => {
  const props = { 
    location: { pathname: '/' }, profile: { username: undefined }, isLoggedIn: false 
  };
  const wrapper = shallow(<SearchForm {...props} />);
  const preventDefault = jest.fn();

  wrapper.find('form').simulate('submit', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
});

it('Should call onSubmit for valid form submission', () => {
  const value = 'Search string';
  axios.post.mockImplementationOnce();
  const push = jest.fn();
  const props = { 
    history: { push }, location: { pathname: '/' }, profile: { username: undefined }, isLoggedIn: false 
  }
  const preventDefault = jest.fn();
  const wrapper = shallow(<SearchForm {...props} />);

  wrapper.find('input').at(0).simulate('change', { target: { value } });
  expect(wrapper.state('searchString')).toBe(value);
  wrapper.find('form').simulate('submit', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
});