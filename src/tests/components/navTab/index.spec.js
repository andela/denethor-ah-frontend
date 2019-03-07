import { mount } from 'enzyme';
import React from 'react';
import NavTab from '../../../components/navTabs/index'

describe ('Test for the navTab in the footer Component',() => {
it ('should contain ', () => {
const wrapper = mount ( <NavTab/> );
expect (wrapper.find('a').length).toBe(9)
});
});