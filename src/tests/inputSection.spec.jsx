import { mount } from 'enzyme';
import React from 'react';
import InputSection from '../components/InputSection';

describe('Test for the input section in the footer component', () => {
    const prop = {
        id: '',
        placeHolder: '',
        onChange: () => { },
        type: '',
        className: '',
        Ref: React.createRef(),
        name: '',
        onKeyUp: () => { },
        onBlur: () => { },
        onFocus: () => { }
    };
    it('should contain', () => {
        const wrapper = mount(< InputSection {...prop} />);
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('input').length).toBe(1);
    });
});
