import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../components/footer/index';
import SearchForm from '../../../components/searchForm/SearchForm';

describe('Test for the footer component', () => {
  it('should contain', () => {
    const wrapper = shallow( <Footer /> );
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find(SearchForm).length).toBe(1);
  })
})