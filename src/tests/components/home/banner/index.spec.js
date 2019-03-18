import React from 'react';
import { shallow } from 'enzyme';
import { Banner } from '../../../../components/home/banner';

test('Should render banner with stats correctly', () => {
  const wrapper = shallow(<Banner bannerScreen={'Stats'} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should call signup function on button click', () => {
  const push = jest.fn();
  const history = { push }
  const wrapper = shallow(<Banner bannerScreen={'Stats'} history={history}/>);
  wrapper.find('button').simulate('click');
  expect(push).toHaveBeenCalledWith('/signup');
});

test('Should render banner with login correctly', () => {
  const wrapper = shallow(<Banner bannerScreen={'Login'}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render banner with signup correctly', () => {
  const wrapper = shallow(<Banner bannerScreen={'Signup'}/>);
  expect(wrapper).toMatchSnapshot();
});
