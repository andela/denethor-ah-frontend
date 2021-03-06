import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../components/footer/index';

describe('Test for the footer component', () => {
  it('should contain', () => {
    const wrapper = shallow( <Footer /> );
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('div').length).toBe(5);
  })
})