import { shallow } from 'enzyme';
import React from 'react';
import NavTab from '../../../components/navTabs/index'

describe ('Test for the navTab in the footer Component',() => {
  it ('should contain ', () => {
    const wrapper = shallow(<NavTab />);
    expect (wrapper.length).toBe(1)
  });
});