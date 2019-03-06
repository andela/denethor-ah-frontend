import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../../components/footer/index';

describe('Test for the footer component', () => {
    it('should contain', () => {
        const wrapper = mount( < Footer /> );
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('span').length).toBe(2);
        expect(wrapper.find('div').length).toBe(8);
        expect(wrapper.find('InputSection').length).toBe(1);
        expect(wrapper.find('InputSection').text()).toBe('');
    })
})