import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../../../components/profile/Profile';
import profile from '../../mock-data/profile';


const updateProfile = jest.fn();
const uploadProfilePicture = jest.fn();

const props = {
  updateProfile,
  uploadProfilePicture,
  history: {}
}
const wrapper = shallow(<Profile {...props} profile={profile.data} />);

test('Should render component correctly', () => {
  wrapper.update();

  expect(wrapper).toMatchSnapshot();
});

test('Shoould update state on input change', () => {
  wrapper.find('input').at(0).simulate('change', { target: { value: 'Omoefe' } });
  expect(wrapper.state('firstname')).toBe('Omoefe');

  wrapper.find('input').at(1).simulate('change', { target: { value: 'Om' } });
  expect(wrapper.state('lastname')).toBe('Om');

  wrapper.find('input').at(2).simulate('change', { target: { value: 'Om' } });
  expect(wrapper.state('username')).toBe('Om');

  wrapper.find('textarea').simulate('change', { target: { value: 'Omoefe' } });
  expect(wrapper.state('bio')).toBe('Omoefe');
});

test('Shoould validate on input blur', () => {
  wrapper.find('input').at(0).simulate('change', { target: { value: 'Om' } });
  expect(wrapper.state('firstname')).toBe('Om');

  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('firstnameError')).toBe('First name must be at least 3 characters');

  wrapper.find('input').at(0).simulate('change', { target: { value: 'Omo efe' } });
  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('firstnameError')).toBe('Names cannot contain spaces');

  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('lastnameError')).toBe('Last name must be at least 3 characters');

  wrapper.find('input').at(1).simulate('change', { target: { value: 'Omo efe' } });
  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('lastnameError')).toBe('Names cannot contain spaces');

  wrapper.find('input').at(2).simulate('blur');
  expect(wrapper.state('usernameError')).toBe('Username must be at least 3 characters');

  wrapper.find('input').at(2).simulate('change', { target: { value: 'Omo efe' } });
  wrapper.find('input').at(2).simulate('blur');
  expect(wrapper.state('usernameError')).toBe('Username cannot contain spaces');

  wrapper.find('textarea').simulate('blur');
  expect(wrapper.state('bioError')).toBe('Bio must be at least 10 characters if present');
});


